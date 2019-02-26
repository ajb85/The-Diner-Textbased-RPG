import React, { Component } from "react";
import Chatroom from "../Chat/Chatroom.js";
import Fight from "../Fight/Fight.js";
import toggleMode from "./toggleMode.js";
import api from "../../api.js";
/*
Props:
loadPage={props.loadPage}
char={char}
*/
export default class GameLoader extends Component {
  constructor(props) {
    super(props);

    this.state = { userlist: [], mode: "chat" };
  }
  componentDidMount() {
    api.getUserList(this.updateUserlist);
    api.toggleStatus(this.props.char.name);
  }

  updateUserlist = userlist => {
    // Update userlist when received
    this.setState({ userlist });
  };

  updateMode = mode => {
    this.setState({ mode });
  };

  render() {
    const Mode = toggleMode(Chatroom)(Fight);
    console.log("HOC: ", Mode);

    return (
      <Mode
        char={this.props.char}
        mode={this.state.mode}
        userList={this.state.userList}
      />
    );
  }

  // props.loadPage(<Mode char={props.char} />);
}
