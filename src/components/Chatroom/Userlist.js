import React, { Component } from "react";
import ContextButtons from "./ContextButtons.js";
import api from "../../api.js";

/* props:
char={this.props.char}
updateOpponent={this.props.updateOpponent}
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
      this.props.updateOpponent(eventData.fromUser);
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
    console.log("PrevChal: ", prevChal);
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
      // start fight
    } else if (res === "decline") {
      // User declined
      aggressors.shift();
      this.setState({ aggressors: [...aggressors] });
    }
  };

  buildUserlist = () => {
    const { selected, challenging, aggressors } = this.state;

    return this.state.userlist.map((user, index) => {
      let pClassName, dClassName;
      const btnCallbacks = {
        challenge: this.challengeUser,
        fightResponse: this.fightResponse
      };

      // Set classname to color DIV according to context
      if (!user.active) {
        pClassName = "inactive";
      }
      if (user.name === aggressors[0]) {
        dClassName = "aggressor";
      } else if (user.name === challenging) {
        dClassName = "challenging";
      } else if (user.name === selected) {
        dClassName = "selected";
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

  render() {
    let userlist = [<p>Loading...</p>];

    if (this.state && this.state.userlist.length) {
      userlist = this.buildUserlist();
    }
    return <div className="users">{userlist}</div>;
  }
}

/*
challengeUser = () => {
  // Users can challenge others to a fight.  Challenging someone who has
  // challenged you starts a fight.  Each user can only challenge one other
  // user
  const { selected, challenging, aggressors } = this.state;

  // Currently you can challenge someone while someone has already
  // challenged you.

  if (selected && !challenging) {
    // If someone is selected to be challenged but no one is currently
    // challenged by user

    // Send fight request and announce request to the chat room
    api.sendEventToUser(selected, this.props.char.name, "fight");
    // OBJ = {name: name, message: message, type: ("emote" || "message")}
    const chatOBJ = {
      name: this.props.char.name,
      message: `has been wronged by ${selected} and demands satisfaction!`,
      type: "system"
    };
    api.sendChat(chatOBJ);
    // Add challenged user to state
    this.setState({ challenging: selected });
  } else if (selected === challenging) {
    // Pressing the challenge button twice on a target cancels  the challenge
    // and deselects the target
    this.setState({ challenging: "" });
    this.setState({ selected: "" });
  } else if (aggressors.includes(challenging)) {
    // If challenging someone who has already challenged the user, start
    // the fight!
  }
};
*/

/*
selectUser = i => {
  // When a user clicks on another user's name, their name is highlighted
  // and grey and buttons pop up with options to interact

  let selected = "";

  const name = this.state.selected;
  const { userlist } = this.state;
  const user = userlist[i];

  if (
    name !== this.state.selected &&
    name !== this.props.char.name &&
    user.active
  ) {
    // If a new user is selected and it isn't themselves
    // Also, selected user is active in chat
    selected = name;
  }
  this.setState({ selected });
};
*/
