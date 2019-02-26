import React, { Component } from "react";
import CreateUserList from "./HelperComps/CreateUserList.js";
import Chatbox from "./Chatbox.js";
import api from "./api.js";

// props: changeGame, char, userList
export default class Chatroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typing: "",
      chatlog: [],
      userList: ["Loading..."],
      selected: "",
      challenging: "",
      aggressors: []
    };
  }
  componentDidMount() {
    // Mark user as active in chat, update the current user list
    api.toggleStatus(this.props.char.name);
    api.getUserList(this.onuserlistListener);

    // Listen for userlist updates, new chat, and incoming
    // events from users
    api.userlistListener(this.onuserlistListener);
    api.chatListener(this.onChatReceive);
    api.eventListener(this.onReceiveRequest);
  }

  updateStateCondition = (condition, value) => {
    this.setState({ [condition]: value });
  };

  onChatReceive = message => {
    let chatlog = [...this.state.chatlog];
    chatlog.push(message);
    if (chatlog.length > 50) {
      chatlog.shift();
    }
    this.setState({ chatlog });
  };

  onuserlistListener = userList => {
    this.setState({ userList });
  };

  onReceiveRequest = eventData => {
    let { aggressors } = this.state;
    // Save aggressor names in an array so they can be queued and index zero
    // highlighted in the user list
    if (
      eventData.type === "fight" &&
      eventData.fromUser === this.state.challenging
    ) {
      this.props.updateOpponent(eventData.fromUser);
    } else if (eventData.type === "fight") {
      aggressors.push(eventData.fromUser);
      this.setState({ aggressors: [...aggressors] });
    }
  };

  waveAtUser = (name, test) => {
    let waveOBJ = { name: this.props.char.name };
    // Psh, some people...trying to wave at themselves
    if (name === this.props.char.name) {
      waveOBJ.message = `waves at themselves.`;
      waveOBJ.type = "emote";
      api.sendChat(waveOBJ);
    } else {
      waveOBJ.message = `waves at ${name}`;
      waveOBJ.type = "emote";
      api.sendChat(waveOBJ);
    }
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
    const { aggressors, selected, challenging } = this.state;
    const stateConditions = { aggressors, selected, challenging };
    const processedMessages = this.processMessages();
    return (
      <div className="container diner">
        <div className="chatContainer">
          <div className="chatlog">{processedMessages}</div>
          <Chatbox
            submitChat={this.submitChat}
            handleTyping={this.handleTyping}
            typing={this.state.typing}
          />
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
