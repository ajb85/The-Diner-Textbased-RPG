import React, { Component } from "react";
import CreateUserList from "./HelperComps/CreateUserList.js";
import Fight from "./Fight.js";
import api from "./api.js";

// props: changeGame, char, userList
export default class Chatroom extends Component {
  constructor(props) {
    super(props);

    //binding 'this' to all my functions so I don't have to when they're invoked
    this.handleTyping = this.handleTyping.bind(this);
    this.submitChat = this.submitChat.bind(this);
    this.onChatReceive = this.onChatReceive.bind(this);
    this.onReceiveUserList = this.onReceiveUserList.bind(this); // Local
    this.receiveRequestAnswer = this.receiveRequestAnswer.bind(this);
    this.updateStateCondition = this.updateStateCondition.bind(this);
    this.waveAtUser = this.waveAtUser.bind(this);
    this.receiveRequest = this.receiveRequest.bind(this);
    this.processMessages = this.processMessages.bind(this);

    this.state = {
      typing: "",
      chatlog: [],
      userList: ["Loading..."],
      selected: "",
      challenging: "",
      aggressors: []
    };
    api.updateUserList(this.onReceiveUserList);
    api.getUserList(this.onReceiveUserList);
    api.receiveChat(this.onChatReceive);
    api.onEventReceived(this.receiveRequest);
  }
  updateStateCondition(condition, value) {
    this.setState({ [condition]: value });
  }
  handleTyping(e) {
    const maxCharLimit = 164;
    if (e.target.value.length <= maxCharLimit) {
      this.setState({ typing: e.target.value });
    }
  }
  submitChat(e) {
    e.preventDefault();
    const message = this.state.typing;
    // OBJ = {name: charName, message:WhatTheyTyped, type: ("emote" || "message")}
    const name = this.props.char.name;
    let messageOBJ = formatMessageOBJ(name, message);
    if (messageOBJ) api.sendChat(messageOBJ);
    // Reset field
    this.setState({ typing: "" });

    return false;
  }
  onChatReceive(message) {
    let { chatlog } = this.state;
    chatlog.push(message);
    if (chatlog.length > 50) {
      chatlog.shift();
    }
    this.setState({ chatlog });
  }

  onReceiveUserList(userList) {
    this.setState({ userList });
  }
  // receiveUserList(userList) { // Local
  //   this.setState({ userList }); // Local
  // }  // Local
  receiveRequest(eventData) {
    let { aggressors } = this.state;
    // Save aggressor names in an array so they can be queued and index zero
    // highlighted in the user list
    if (
      eventData.type === "fight" &&
      eventData.fromUser === this.state.challenging
    ) {
      this.props.changeGame(
        <Fight
          char={this.props.char}
          opponent={eventData.fromUser}
          changeGame={this.props.changeGame}
        />
      );
    } else if (eventData.type === "fight") {
      aggressors.push(eventData.fromUser);
      this.setState({ aggressors: [...aggressors] });
    }
  }
  receiveRequestAnswer(res) {
    if (res) {
      // Load fight
    } else {
      //Untested
      //moved to helper --> this.cancelChallenge();
    }
  }
  waveAtUser(name, test) {
    let waveOBJ = { name: this.props.char.name };
    // Psh, sum people...trying to wave at themselves
    if (name === this.props.char.name) {
      waveOBJ.message = `waves at themselves.`;
      waveOBJ.type = "emote";
      api.sendChat(waveOBJ);
    } else {
      waveOBJ.message = `waves at ${name}`;
      waveOBJ.type = "emote";
      api.sendChat(waveOBJ);
    }
  }
  processMessages() {
    return [...this.state.chatlog].map(message => {
      if (message.type === "emote") {
        return (
          <p className="emote">
            {message.name} {message.message}
          </p>
        );
      } else if (message.type === "message") {
        return (
          <p className="message">
            {message.name} says: {message.message}
          </p>
        );
      }
    });
  }

  render() {
    const { aggressors, selected, challenging } = this.state;
    const stateConditions = { aggressors, selected, challenging };
    const processedMessages = this.processMessages();
    return (
      <div className="container diner">
        <div className="chatContainer">
          <div className="chatlog">{processedMessages}</div>
          <form onSubmit={this.submitChat}>
            <input
              type="text"
              onChange={this.handleTyping}
              value={this.state.typing}
            />
            <button>Talk</button>
          </form>
        </div>
        <div className="buttonsAndList">
          <div className="users">
            <CreateUserList
              userList={this.state.userList}
              stateConditions={stateConditions}
              updateStateCondition={this.updateStateCondition}
              changeGame={this.props.changeGame}
              char={this.props.char}
              wave={this.waveAtUser}
            />
          </div>
        </div>
      </div>
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
