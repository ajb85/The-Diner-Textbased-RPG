import React from "react";
import api from "../../api.js";

/*
Props:
name={props.char.name}
user={user.name}
actions={challenge: this.challengeUser,
        fightResponse: this.fightResponse}
context={{selected, challenging, aggressors}}
*/
//
export default function ContextButtons(props) {
  function sendEmote(message) {
    let chatOBJ = { name: props.name };

    chatOBJ.message = message;
    chatOBJ.type = "emote";
    api.sendChat(chatOBJ);
  }

  // Render
  const { selected, challenging, aggressors } = props.context;
  const user = props.user;
  let callbackLeft, callbackRight, iconLeft, iconRight;

  if (user === aggressors[0]) {
    // User is aggressive, give fight/decline buttons when selected

    // Fight Button
    callbackLeft = props.actions.fightResponse.bind(this, "fight");
    iconLeft = <i class="far fa-check-circle" />;

    // Decline button
    callbackRight = props.actions.fightResponse.bind(this, "decline");
    iconRight = <i class="far fa-times-circle" />;
  } else if (user === challenging) {
    // User is challenged by client, give the option to unchallenge or taunt

    // Unchallenge Button
    callbackLeft = props.actions.challenge.bind(this, "unchallenge");
    iconLeft = <i class="fas fa-swords" />;

    // Taunt button
    callbackRight = sendEmote.bind(
      this,
      `is beginning to wonder if ${props.user} has what it takes.`
    );
    iconRight = <i class="far fa-user-clock" />;
  } else if (user === selected) {
    // If client clicks on a user, give the option to challenge or wave

    if (challenging === "") {
      // Challenge Button --> Only render if no one is challenged
      callbackLeft = props.actions.challenge.bind(this, "challenge");
      iconLeft = <i class="fas fa-swords" />;
    } else {
      callbackLeft = console.log.bind(this, "Inactive btn");
      iconLeft = <i class="fas fa-swords inactive" />;
    }

    // Wave button
    callbackRight = sendEmote.bind(this, `waves at ${props.user}`);
    iconRight = <i class="fas fa-hand-paper" />;
  }
  const leftBtn = <button onClick={callbackLeft}>{iconLeft}</button>;
  const rightBtn = <button onClick={callbackRight}>{iconRight}</button>;

  return (
    <div className="actionButtons">
      {leftBtn}
      {rightBtn}
    </div>
  );
}
