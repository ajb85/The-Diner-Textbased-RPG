import React, { Component } from "react";
import Userlist from "./Userlist.js";
import Chatbox from "./Chatbox.js";
import Chatlog from "./Chatlog.js";
import api from "../../api.js";

/*
Props:
char={this.props.char}
updateOpponent={this.props.updateOpponent}
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
          <Chatlog />
          <Chatbox name={this.props.char.name} />
        </div>
        <div className="buttonsAndList">
          <Userlist
            char={this.props.char}
            updateOpponent={this.props.updateOpponent}
          />
        </div>
      </div>
    );
  }
}
