import React, { Component } from "react";
import Fight from "../Fight.js";
import CreateULButtons from "./CreateULButtons.js";
import api from "../api.js";

/* props: userList
          stateConditions:{selected, challenging, aggressors}
          updateStateCondition
          changeGame
          char
          wave
          */

export default class CreateUserList extends Component {
  constructor(props) {
    super(props);
    this.selectUser = this.selectUser.bind(this);
    this.declineFight = this.declineFight.bind(this);
    this.acceptFight = this.acceptFight.bind(this);
    this.challengeUser = this.challengeUser.bind(this);
  }
  challengeUser(e) {
    //fake request to send request to server goes here
    const { selected, challenging } = this.props.stateConditions;
    // Currently you can challenge someone while someone has already
    // challenged you.  That can be changed here by checking for:
    // !stateConditions.aggressors

    // !!! Need condition to check if aggressive user is being challeneged,
    // !!! in which case just start the fight

    // No one is challenged but someone is selected
    if (selected && !challenging) {
      api.sendEventToUser(selected, this.props.char.name, "fight");
      api.sendChat(
        `*${
          this.props.char.name
        } has been wronged by ${selected} and demands satisfaction!*`
      );
      this.props.updateStateCondition("challenging", selected);
      // Pressing the challenge button twice on a target cancels it.
    } else if (selected === challenging) {
      this.props.updateStateCondition("challenging", "");
      //Deselect the target automatically after canceling challenge
      this.props.updateStateCondition("selected", "");
    }
  }

  selectUser(e) {
    let selected = "";
    if (this.props.stateConditions.selected !== e.target.innerHTML) {
      selected = e.target.innerHTML;
    }
    this.props.updateStateCondition("selected", selected);
  }
  declineFight() {
    // FAKE tell aggressive user fight was declined
    let aggressors = [...this.props.stateConditions.aggressors].shift();
    this.props.updateStateCondition("aggressors", aggressors);
  }
  acceptFight(opponent) {
    //begin fight
    api.sendEventToUser(
      this.props.stateConditions.aggressors[0],
      this.props.char.name,
      "fight"
    );
    this.props.changeGame(<Fight char={this.props.char} opponent={opponent} />);
  }
  render() {
    let userList = [<p>Loading...</p>];
    if (this.props.userList) {
      const { selected, challenging, aggressors } = this.props.stateConditions;
      userList = this.props.userList.map((user, i) => {
        // React won't let an element be created then edited so rather than create it
        // and assign a class, I'm just creating it with different classes.
        switch (user) {
          case challenging:
            return (
              <div className="challenging">
                <p key={i} onClick={this.selectUser}>
                  {user}
                </p>
              </div>
            );
            break;
          case aggressors[0]:
            return (
              <div className="aggressor" key={i}>
                <p onClick={this.selectUser}>{user}</p>
                <CreateULButtons
                  target={user}
                  acceptFight={this.acceptFight}
                  declineFight={this.declineFight}
                />
              </div>
            );
            break;

          case selected:
            return (
              <div className="selected">
                <p key={i} onClick={this.selectUser}>
                  {user}
                </p>
                <CreateULButtons
                  target={user}
                  challengeUser={this.challengeUser}
                  wave={this.props.wave}
                  char={this.props.char}
                />
              </div>
            );
            break;
          default:
            return (
              <p key={i} onClick={this.selectUser}>
                {user}
              </p>
            );
        }
      });
    }
    return userList;
  }
}

// <button onClick={this.acceptFight.bind(aggressors[0])}>
//   ✓
// </button>
// <button onClick={this.declineFight}>X</button>

// case user === challenging && user === selected:
//   return (
//     <p
//       key={i}
//       onClick={this.selectUser}
//       className="challenging selected"
//     >
//       {user}
//     </p>
//   );
//   break;
// case user === aggressors[0] && user === selected:
//   return (
//     <p key={i} onClick={this.selectUser} className="aggressor selected">
//       {user}
//     </p>
//   );
//   break;
