import React, { Component } from "react";
import Fight from "../Fight.js";

/* props: userList
          stateConditions:{selected, challenging, aggressors}
          updateStateCondition
          changeGame
          char
          */
export default class CreateUserList extends Component {
  constructor(props) {
    super(props);
    this.selectUser = this.selectUser.bind(this);
    //this.selectChallenging = this.selectChallenging.bind(this);
    this.declineFight = this.declineFight.bind(this);
    this.acceptFight = this.acceptFight.bind(this);
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
    // FAKE tell aggressive user fight was accepted, begin fight
    //begin fight
    this.props.changeGame(
      <Fight char={this.props.char} otherUser={opponent} />
    );
  }
  render() {
    const { selected, challenging, aggressors } = this.props.stateConditions;
    let userList = this.props.userList.map((user, i) => {
      // React won't let an element be created then edited so rather than create it
      // and assign a class, I'm just creating it with different classes.
      switch (user) {
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
        case challenging:
          return (
            <p key={i} onClick={this.selectUser} className="challenging">
              {user}
            </p>
          );
          break;
        // case user === aggressors[0] && user === selected:
        //   return (
        //     <p key={i} onClick={this.selectUser} className="aggressor selected">
        //       {user}
        //     </p>
        //   );
        //   break;
        case aggressors[0]:
          return (
            <div className="aggressor">
              <p key={i} onClick={this.selectUser}>
                {user}
              </p>
              <div>
                <button onClick={this.acceptFight.bind(aggressors[0])}>
                  ✓
                </button>
                <button onClick={this.declineFight}>X</button>
              </div>
            </div>
          );
          break;

        case selected:
          return (
            <p key={i} onClick={this.selectUser} className="selected">
              {user}
            </p>
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
    return userList;
  }
}
