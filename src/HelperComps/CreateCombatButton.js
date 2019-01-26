import React, { Component } from "react";
/* Props: stateConditions:{selected, challenging, aggressors}*/
export default class CreateCombatButton extends Component {
  constructor(props) {
    super(props);

    this.challengeUser = this.challengeUser.bind(this);
    this.cancelChallenge = this.cancelChallenge.bind(this);
  }
  challengeUser() {
    // fake request to send request to server goes here
    const { selected, challenging } = this.props.stateConditions;
    // Currently you can challenge someone while someone has already
    // challenged you.  That can be changed here by checking for:
    // !stateConditions.aggressors
    if (selected && !challenging) {
      this.props.updateStateCondition(selected);
    }
  }

  cancelChallenge() {
    // fake request to send cancel request to server
    const challenging = "";
    this.props.updateStateCondition(challenging);
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
    // Buttons change appearance after being clicked and can cancel the fight
    // if they desire
    if (this.props.stateConditions.challenging) {
      combatButton = (
        <button className="challenging" onClick={this.cancelChallenge}>
          <p>Fight Requested!</p>
          <p>{this.props.stateConditions.challenging}</p>
        </button>
      );
    }

    return combatButton;
  }
}
