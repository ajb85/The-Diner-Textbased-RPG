import React, { Component } from "react";
import Chatroom from "../Chatroom/Chatroom.js";
import Fight from "../Fight/Fight.js";
import Death from "../Fight/Death.js";
import toggleMode from "./toggleMode.js";
/*
Props:
loadPage={props.loadPage}
char={char}
*/
export default class GameLoader extends Component {
  constructor(props) {
    super(props);
    this.state = { opponent: "", mode: "chat" };
  }

  updateGameMode = (opponent, mode) => {
    this.setState({ opponent, mode });
  };

  render() {
    const Mode = toggleMode(Chatroom)(Fight)(Death);

    return (
      <Mode
        char={this.props.char}
        opponent={this.state.opponent}
        mode={this.state.mode}
        updateGameMode={this.updateGameMode}
      />
    );
  }

  // props.loadPage(<Mode char={props.char} />);
}
