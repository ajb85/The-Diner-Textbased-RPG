import React, { Component } from "react";
import Fight from "../Fight.js";
import ContextButtons from "./ContextButtons.js";
import api from "../api.js";

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

  updateUserEvent = (eventType, user) => {
    this.setState({ [eventType]: user });
  };

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
      this.props.updateOpponent(eventData.fromUser);
    } else if (eventData.type === "fight") {
      aggressors.push(eventData.fromUser);
      this.setState({ aggressors: [...aggressors] });
    } else if (eventData.type === "decline") {
      this.setState({ challenging: "" });
    }
  };

  waveAtUser = (name, test) => {
    let waveOBJ = { name: this.props.char.name };
    // Psh, some people...trying to wave at themselves
    if (name === this.props.char.name) {
      waveOBJ.message = `waves at themselves.`;
      waveOBJ.type = "emote";
      api.sendChat(waveOBJ);
    } else {
      waveOBJ.message = `waves at ${name}`;
      waveOBJ.type = "emote";
      api.sendChat(waveOBJ);
    }
  };

  challengeUser = e => {
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
      api.sendChat(
        `*${
          this.props.char.name
        } has been wronged by ${selected} and demands satisfaction!*`
      );
      // Add challenged user to state
      this.updateUserEvent("challenging", selected);
    } else if (selected === challenging) {
      // Pressing the challenge button twice on a target cancels  the challenge
      // and deselects the target
      this.updateUserEvent("challenging", "");
      this.updateUserEvent("selected", "");
    } else if (aggressors.includes(challenging)) {
      // If challenging someone who has already challenged the user, start
      // the fight!
    }
  };

  selectUser = e => {
    // When a user clicks on another user's name, their name is highlighted
    // and grey and buttons pop up with options to interact

    let selected = "";
    if (
      this.state.selected !== e.target.textContent &&
      e.target.textContent !== this.props.char.name
    ) {
      // If a new user is selected and it isn't themselves
      selected = e.target.textContent;
    }
    this.updateUserEvent("selected", selected);
  };

  declineFight = () => {
    // If a user decides not to fight, delete the request
    api.sendEventToUser(
      this.state.aggressors[0],
      this.props.char.name,
      "decline"
    );
    let aggressors = [...this.props.stateConditions.aggressors].shift();
    this.updateUserEvent("aggressors", aggressors);
  };

  acceptFight = opponent => {
    // User A challenge User B.  B accepted
    api.sendEventToUser(
      this.props.stateConditions.aggressors[0],
      this.props.char.name,
      "fight"
    );
    this.props.changeGame(<Fight char={this.props.char} opponent={opponent} />);
  };

  buildUserlist = () => {
    const { selected, challenging, aggressors } = this.state;

    return this.state.userlist.map((user, i) => {
      switch (user) {
        case challenging:
          return (
            <div className="challenging">
              <p key={user} onClick={this.selectUser}>
                {user}
              </p>
            </div>
          );
          break;

        case aggressors[0]:
          const callbacks = {
            fight: this.acceptFight,
            decline: this.declineFight
          };
          return (
            <div className="aggressor" key={user}>
              <p onClick={this.selectUser}>{user}</p>
              <ContextButtons target={user} actions={callbacks} />
            </div>
          );
          break;

        case selected:
          const callbacks = {
            challenge: this.challengeUser,
            wave: this.waveAtUser
          };
          return (
            <div className="selected">
              <p key={user} onClick={this.selectUser}>
                {user}
              </p>
              <ContextButtons target={user} actions={callbacks} />
            </div>
          );
          break;

        default:
          return (
            <p key={user} onClick={this.selectUser}>
              {user}
            </p>
          );
      }
    });
  };

  render() {
    let userlist = [<p>Loading...</p>];

    if (this.state && this.state.userlist.length) {
      userlist = this.buildUserlist();
    }
    return <div className="users">userlist</div>;
  }
}
