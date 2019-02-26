import React, { Component } from "react";
import api from "./api.js";
/*
Props:

*/
export default class Chatlog extends Component {
  constructor() {
    super();

    this.state = { chatlog: [] };
  }
  componentDidMount() {
    api.chatListener(this.onChatReceive);
  }

  onChatReceive = message => {
    let chatlog = [...this.state.chatlog];
    chatlog.push(message);
    if (chatlog.length > 50) {
      chatlog.shift();
    }
    this.setState({ chatlog });
  };

  processMessages = () => {
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
  };

  render() {
    return <div className="chatlog">{this.processMessages()}</div>;
  }
}
