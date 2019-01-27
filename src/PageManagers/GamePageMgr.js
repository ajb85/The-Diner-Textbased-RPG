import React, { Component } from "react";
import Diner from "../Diner.js";
import Fight from "../Fight.js";

// Props = loadPage, char
export default class GamePageMgr extends Component {
  constructor(props) {
    super(props);
    this.changeGame = this.changeGame.bind(this);
    this.state = {
      gamePage: <Diner char={this.props.char} changeGame={this.changeGame} />
    };
  }
  changeGame(gamePage) {
    this.setState({ gamePage });
  }

  render() {
    return <div>{this.state.gamePage}</div>;
  }
}
