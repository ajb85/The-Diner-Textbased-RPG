import React, { Component } from "react";
import fightIMG from "../img/lilking-Jeweled-Sword.png";
/* Props: target, CONTEXT FUNCTIONS, char*/
export default class CreateCombatButton extends Component {
  constructor(props) {
    super(props);
    this.aggressiveUser = this.aggressiveUser.bind(this);
    this.selectedUser = this.selectedUser.bind(this);
  }

  aggressiveUser() {
    const acceptButton = (
      <button onClick={this.props.acceptFight.bind(this, this.props.target)}>
        ✓
      </button>
    );
    const cancelButton = (
      <button onClick={this.props.declineFight.bind(this, this.props.target)}>
        X
      </button>
    );
    return (
      <div className="actionButtons">
        {acceptButton}
        {cancelButton}
      </div>
    );
  }
  selectedUser() {
    const challengeButton = (
      <button onClick={this.props.challengeUser.bind(this, this.props.target)}>
        <img src={fightIMG} />
      </button>
    );
    const waveButton = (
      <button onClick={this.props.wave.bind(this, this.props.target)}>
        Wave
      </button>
    );
    return (
      <div className="actionButtons">
        {challengeButton}
        {waveButton}
      </div>
    );
  }
  render() {
    let actionButtons = [];
    if (this.props.acceptFight) {
      actionButtons = this.aggressiveUser();
    } else if (
      this.props.challengeUser &&
      this.props.char !== this.props.target
    ) {
      actionButtons = this.selectedUser();
    }

    return actionButtons;
  }
}
