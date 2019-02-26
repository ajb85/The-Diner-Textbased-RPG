import React, { Component } from "react";
import Chatroom from "../Chatroom/Chatroom.js";
import Fight from "../Fight/Fight.js";
import toggleMode from "./toggleMode.js";
/*
Props:
loadPage={props.loadPage}
char={char}
*/
export default class GameLoader extends Component {
  constructor(props) {
    super(props);

    this.state = { opponent: "" };
  }

  updateOpponent = opponent => {
    this.setState({ opponent });
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
        mode={this.state.opponent}
        updateOpponent={this.updateOpponent}
      />
    );
  }

  // props.loadPage(<Mode char={props.char} />);
}
