import React, { Component } from "react";
/* Props: stateConditions:{selected, challenging, aggressors}*/
export default class CreateCombatButton extends Component {
  constructor(props) {
    super(props);
    this.challengeUser = this.challengeUser.bind(this);
  }
  challengeUser(e) {
    // fake request to send request to server goes here
    const { selected, challenging } = this.props.stateConditions;
    // Currently you can challenge someone while someone has already
    // challenged you.  That can be changed here by checking for:
    // !stateConditions.aggressors

    // !!! Need condition to check if aggressive user is being challeneged,
    // !!! in which case just start the fight

    // No one is challenged but someone is selected
    if (selected && !challenging) {
      this.props.updateStateCondition("challenging", selected);
      // Pressing the challenge button twice on a target cancels it.
    } else if (selected === challenging) {
      this.props.updateStateCondition("challenging", "");
      //Deselect the target automatically after canceling challenge
      this.props.updateStateCondition("selected", "");
    }
  }

  render() {
    const buttonStyle = this.props.stateConditions.selected
      ? "activeFightButton"
      : "disabledButton";
    let combatButton = (
      <button className={buttonStyle} onClick={this.challengeUser}>
        Request Fight
      </button>
    );

    return combatButton;
  }
}
