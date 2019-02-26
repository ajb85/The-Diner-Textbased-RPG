import React, { Component } from "react";
/*
Props:
char={this.props.char}
mode={this.state.mode}
userList={this.state.userList}
*/
const toggleMode = Chatroom => FightMode =>
  class extends Component {
    render() {
      if (!this.props.opponent) {
        console.log("Loading Chat");
        return (
          <Chatroom
            char={this.props.char}
            updateOpponent={this.props.updateOpponent}
          />
        );
      } else {
        console.log("Entering Fight");
        return (
          <FightMode
            char={this.props.char}
            opponent={this.props.opponent}
            updateOpponent={this.props.updateOpponent}
          />
        );
      }
    }
  };

export default toggleMode;
