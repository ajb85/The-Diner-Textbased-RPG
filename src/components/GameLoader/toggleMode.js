import React, { Component } from "react";

/*
Props:
char={this.props.char}
mode={this.state.mode}
userList={this.state.userList}
*/
const toggleMode = Chatroom => FightMode => Death =>
  class extends Component {
    render() {
      if (this.props.mode === "chat") {
        console.log("Loading Chat");
        return (
          <Chatroom
            char={this.props.char}
            updateGameMode={this.props.updateGameMode}
          />
        );
      } else if (this.props.mode === "fight") {
        console.log("toggleMode combat");
        return (
          <FightMode
            char={this.props.char}
            opponent={this.props.opponent}
            updateGameMode={this.props.updateGameMode}
          />
        );
      } else if (this.props.mode === "death") {
        return <Death />;
      }
    }
  };

export default toggleMode;
