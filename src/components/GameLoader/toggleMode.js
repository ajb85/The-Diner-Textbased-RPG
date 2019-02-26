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
      // Leaving the option open for extra modes
      if (this.props.mode === "chat") {
        console.log("Loading Chat");
        return (
          <Chatroom char={this.props.char} userList={this.props.userList} />
        );
      } else if (this.props.mode === "fight") {
        console.log("Entering Fight");
        return <FightMode />;
      }
    }
  };

export default toggleMode;
