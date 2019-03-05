import React, { Component } from "react";
import api from "../../api.js";
/*
Props:
listener={api.chatListener}
context="chat"/"combat"
*/
export default class Chatlog extends Component {
  constructor() {
    super();
    this.state = { chatlog: [] };
  }
  componentDidMount() {
    const receiveChat = {
      chat: this.onMsgReceive,
      combat: this.onCombatReceive
    };
    this.props.listener(receiveChat[this.props.context]);
  }

  onMsgReceive = message => {
    const maxMessages = this.props.msgLimit ? this.props.msgLimit : 50;
    let chatlog = [...this.state.chatlog];
    chatlog.push(message);
    if (chatlog.length > maxMessages) {
      chatlog.shift();
    }
    this.setState({ chatlog });
  };

  onCombatReceive = msgOBJ => {
    // Combat OBJ comes in.  Log it, deal damage if its an attack
    let { chatlog } = this.state;
    chatlog.push(msgOBJ);
    this.setState({ chatlog: [...chatlog] });

    // Damage HP if event is an attack from other user
    this.props.damageHP(msgOBJ);
  };

  processMessages = () => {
    return [...this.state.chatlog].map(message => {
      if (message.type === "emote" || message.type === "system") {
        return (
          <p className={message.type}>
            {message.name} {message.message}
          </p>
        );
      } else if (message.type === "message") {
        return (
          <p className="message">
            {message.name} says: {message.message}
          </p>
        );
      } else if (message.type === "combat") {
        const name = message.fromUser ? message.fromUser : message.name;
        return (
          <p>
            {name} {message.message}
          </p>
        );
      }
    });
  };

  render() {
    return <div className="chatlog">{this.processMessages()}</div>;
  }
}
