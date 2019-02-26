import React, { Component } from "react";
import fightIMG from "../img/lilking-Jeweled-Sword.png";
/*
Props:
target={user}
actions={callbacks}
*/

export default function ContextButtons(props) {
  const aggressiveUser = () => {
    const acceptButton = (
      <button onClick={()=>props.actions.fight(this.props.target)}>
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
    if (this.props.actions.hasOwnProperty("fight")) {
      // User is aggressive, give fight/decline buttons when selected
      actionButtons = this.aggressiveUser();
    } else if (this.props.actions.hasOwnProperty("challenge")) {
      // Otherwise, give normal buttons
      actionButtons = this.selectedUser();
    }

    return actionButtons;
  }
}
