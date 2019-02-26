import React, { Component } from "react";
import Diner from "../Diner.js";
import Fight from "../Fight.js";

// Props = loadPage, char, userList
export default class GamePageMgr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamePage: (
        <Diner
          char={this.props.char}
          changeGame={this.changeGame}
          userList={this.props.userList}
        />
      )
    };
  }

  changeGame = gamePage => {
    if (gamePage === "Diner") {
      this.setState({
        gamePage: (
          <Diner
            char={this.props.char}
            changeGame={this.changeGame}
            userList={this.props.userList}
          />
        )
      });
    } else {
      this.setState({ gamePage });
    }
  };

  render() {
    return <div>{this.state.gamePage}</div>;
  }
}
