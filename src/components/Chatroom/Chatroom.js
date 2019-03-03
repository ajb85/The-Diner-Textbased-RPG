import React, { Component } from "react";
import Userlist from "./Userlist.js";
import Chatbox from "./Chatbox.js";
import Chatlog from "../Chatlog/Chatlog.js";
import api from "../../api.js";

/*
Props:
char={this.props.char}
updateGameMode={this.props.updateGameMode}
*/
export default class Chatroom extends Component {
  componentDidMount() {
    // Mark user as active in chat, update the current user list
    api.toggleStatus(this.props.char.name);
  }

  render() {
    return (
      <div className="container diner">
        <div className="chatContainer">
          <Chatlog listener={api.chatListener} context="chat" />
          <Chatbox name={this.props.char.name} />
        </div>
        <div className="buttonsAndList">
          <Userlist
            char={this.props.char}
            updateGameMode={this.props.updateGameMode}
          />
        </div>
      </div>
    );
  }
}
