import React, { Component } from "react";
import api from "./api.js";
/*
Props:
submitChat
*/
export default class Chatbox extends Component {
  constructor(props) {
    super(props);

    this.state = { typing: "" };
  }

  handleTyping = e => {
    const maxCharLimit = 164;
    if (e.target.value.length <= maxCharLimit) {
      this.setState({ typing: e.target.value });
    }
  };

  sendChat = () => {
    // Build chat object to send to api
    const name = this.props.char.name;
    const message = this.state.typing;
    // OBJ = {name: charName, message:WhatTheyTyped, type:
    // ("emote" || "message")}
    let messageOBJ = formatMessageOBJ(name, message);
    if (messageOBJ) {
      api.sendChat(messageOBJ);
    }
    // Reset field
    this.setState({ typing: "" });

    return false;
  };

  render() {
    return (
      <form onSubmit={this.sendChat}>
        <input type="text" onChange={this.handleTyping} value={props.typing} />
        <button>Talk</button>
      </form>
    );
  }
}

function formatMessageOBJ(name, message) {
  const filtered = filterBadMessage(message);
  if (!filtered) return null;

  let messageOBJ = { name: name };
  const split = filtered.split(" ");

  // If user starts message with /me send a message emote without /me included

  if (split[0].toLowerCase() === "/me") {
    messageOBJ.message = split.slice(1).join(" ");
    messageOBJ.type = "emote";
    // Otherwise send as a normal message
  } else {
    messageOBJ.message = message;
    messageOBJ.type = "message";
  }

  return messageOBJ;
}

function filterBadMessage(message) {
  let characters = message.split("");
  let numOfChars = characters.filter(
    letter => letter.match(/^[a-zA-Z0-9]*$/) !== null
  ).length;

  // Message only sends if 25% of the length is from characters and numbers:
  //if (numOfChars > message.length * 0.25) {
  // At least one character/number in the message:
  if (numOfChars > 0) {
    return message;
  }
  return null;
}
