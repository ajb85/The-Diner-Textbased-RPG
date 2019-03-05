import React, { Component } from "react";
import ContextButtons from "./ContextButtons.js";
import api from "../../api.js";

/* props:
char={this.props.char}
updateGameMode={this.props.updateGameMode}
*/

export default class Userlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userlist: [],
      selected: "",
      challenging: "",
      aggressors: []
    };
  }

  componentDidMount() {
    // Listen for userlist updates, new chat, and incoming
    // events from users
    api.getUserlist(this.onReceiveUserlist);
    api.userlistListener(this.onReceiveUserlist);
    api.eventListener(this.onReceiveRequest);
  }

  onReceiveUserlist = userlist => {
    this.clearDisconnectedUsersFromState();
    this.setState({ userlist });
  };

  onReceiveRequest = eventData => {
    let { aggressors } = this.state;
    // Save aggressor names in an array so they can be queued and index zero
    // highlighted in the user list
    if (
      eventData.type === "fight" &&
      eventData.fromUser === this.state.challenging
    ) {
      // Challenged user accepts fight
      this.props.updateGameMode(eventData.fromUser, "fight");
    } else if (eventData.type === "fight") {
      // New challenge from a user
      aggressors.push(eventData.fromUser);
      this.setState({ aggressors: [...aggressors] });
    } else if (eventData.type === "decline") {
      // Challenged user declines fight
      this.setState({ challenging: "" });
    }
  };

  challengeUser = prevChal => {
    // User clicks the challenge button on a selected user.  The button will
    // persist and can be clicked again, which feeds "prevChal" so we can
    // clear the challenge
    if (prevChal === "unchallenge") {
      this.setState({ challenging: "" });
    } else if (prevChal === "challenge") {
      // N0TE: user is still selected;
      const username = this.state.selected;
      this.setState({ challenging: username });

      // Send fight request and announce request to the chat room
      api.sendEventToUser(username, this.props.char.name, "fight");
      // OBJ = { name: name, message: message, type: ("emote" || "message" || "system") }
      const chatOBJ = {
        name: this.props.char.name,
        message: `has been wronged by ${username} and demands satisfaction!`,
        type: "system"
      };
      api.sendChat(chatOBJ);
    }
  };

  selectUser = i => {
    // Client user clicks on another user:
    // If no one is selected, just select new user ✓
    // If someone is selected, remove selection from old ✓
    // If user clicks the same person twice, remove selection ✓
    // Only allow selection of active users ✓
    // Users cannot select themselves ✓
    const { selected } = this.state;
    const user = this.state.userlist[i];

    if (user.active) {
      // Only active users
      if (user.name === selected) {
        // Selected user was clicked a second time
        this.setState({ selected: "" });
      } else if (user.name !== this.props.char.name) {
        // New user was clicked who is not the client user
        this.setState({ selected: user.name });
      }
    }
  };

  fightResponse = res => {
    // Pass response to other user
    const { aggressors } = this.state;
    api.sendEventToUser(aggressors[0], this.props.char.name, res);

    if (res === "fight") {
      // Fight accept, start fight
      console.log("Fight accepted with: ", aggressors[0]);
      this.props.updateGameMode(aggressors[0], "fight");
    } else if (res === "decline") {
      // User declined
      aggressors.shift();
      this.setState({ aggressors: [...aggressors] });
    }
  };

  buildUserlist = () => {
    const getDivClass = name => {
      if (name === aggressors[0]) {
        return "aggressor";
      } else if (name === challenging) {
        return "challenging";
      } else if (name === selected) {
        return "selected";
      }
    };
    const { selected, challenging, aggressors } = this.state;

    return this.state.userlist.map((user, index) => {
      let pClassName;
      const dClassName = getDivClass(user.name);
      const btnCallbacks = {
        challenge: this.challengeUser,
        fightResponse: this.fightResponse
      };

      // Set classname to color DIV according to context
      if (!user.active) {
        pClassName = "inactive";
      }

      return (
        <div className={dClassName} key={user}>
          <p className={pClassName} onClick={e => this.selectUser(index)}>
            {user.name}
          </p>
          <ContextButtons
            name={this.props.char.name}
            user={user.name}
            actions={btnCallbacks}
            context={{ selected, challenging, aggressors }}
          />
        </div>
      );
    }); // .map
  }; // buildUserlist

  clearDisconnectedUsersFromState = () => {
    // Would be faster to have server send names of disconnected users
    // then clear their names from any state.  However, given the
    // scale of this project, this will work and shouldn't hit
    // performance.  Plus it's much faster to implement so I'm going
    // with it for now

    // Checking to see if we can find the various users in our list of
    // user objects.  If not present, clear them.
    let { selected, challenging, aggressors } = this.state;
    let foundSelect, foundChallenge;
    const foundAggressors = [];

    this.state.userlist.forEach(user => {
      if (selected === user.name) {
        // selected user is still connected
        foundSelect = true;
      }
      if (challenging === user.name) {
        // challenging user is still connected
        foundChallenge = true;
      }

      aggressors.forEach((aggressor, i) => {
        if (user === aggressor) {
          // aggressors who are still connected
          foundAggressors.push(i);
        }
      });

      if (!foundSelect) {
        // Selected user has DC'd
        selected = "";
      }
      if (!foundChallenge) {
        // Challenged user has DC
        challenging = "";
      }

      if (foundAggressors.length < aggressors.length) {
        foundAggressors.sort().forEach((aggIndex, i) => {
          if (aggIndex !== i) {
            // user at aggressors[i] has DC'd
            // ie: aggressors =  ["Sham", "Jenterro", "Beartato"]
            // If Jenterro has DC'd sorted foundAggressors will be
            // [1, 3] so this will evalulate to true at 3 !== 2 thus
            // 2 is our missing index
            aggressors = [
              ...aggressors.slice(0, i),
              ...aggressors.slice(i + 1)
            ];
          }
        });
      }
    });
    this.setState({ selected, challenging, aggressors });
  };

  render() {
    let userlist = [<p>Loading...</p>];

    if (this.state && this.state.userlist.length) {
      userlist = this.buildUserlist();
    }
    return <div className="users">{userlist}</div>;
  }
}
