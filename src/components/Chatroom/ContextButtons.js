import React from "react";

/*
Props:
target={user}
actions={callbacks}
*/

export default function ContextButtons(props) {
  const aggressiveUser = () => {
    const acceptButton = (
      <button onClick={() => props.actions.fight(this.props.target)}>✓</button>
    );
    const cancelButton = (
      <button onClick={() => props.actions.declineFight()}>X</button>
    );
    return (
      <div className="actionButtons">
        {acceptButton}
        {cancelButton}
      </div>
    );
  };

  const selectedUser = () => {
    const challengeButton = (
      <button onClick={() => props.actions.challengeUser(this.props.target)}>
        <i class="fas fa-swords" />
      </button>
    );
    const waveButton = (
      <button onClick={props.actions.wave(this.props.target)}>
        <i class="fas fa-hand-paper" />
      </button>
    );
    return (
      <div className="actionButtons">
        {challengeButton}
        {waveButton}
      </div>
    );
  };
  // Render
  let actionButtons = [];
  if (this.props.actions.hasOwnProperty("fight")) {
    // User is aggressive, give fight/decline buttons when selected
    actionButtons = aggressiveUser();
  } else if (this.props.actions.hasOwnProperty("challenge")) {
    // Otherwise, give normal buttons
    actionButtons = selectedUser();
  }

  return actionButtons;
}
