import React, { Component } from "react";
import textData from "../../data/charSelect.json";
import gFunc from "../../GlobalFunctions.js";
import Hero from "../../Classes/Heroes.js";
import GamePageMgr from "../../PageManagers/GamePageMgr.js";
/*
Props:
loadPage={this.props.loadPage}
name={this.state.name}
userList={res}
*/

export default class CharSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chars: {
        one: this.rollChar(),
        two: this.rollChar(),
        three: this.rollChar(),
        four: this.rollChar()
      }
    };
  }

  rollChar = () => {
    const attributes = ["str", "dex", "intel", "luck"];
    let newChar = { name: this.props.name };
    attributes.forEach(attr => (newChar[attr] = gFunc.getRand(1, 10)));
    return new Hero(newChar);
  };

  handleCharSelect = charKey => {
    const selection = this.state.chars[charKey];
    this.props.loadPage(
      <GamePageMgr
        loadPage={this.props.loadPage}
        char={selection}
        userList={this.props.userList}
      />
    );
  };

  render() {
    const header = <h1>{textData.h1}</h1>;
    const paragraph = gFunc.splitString(textData.p);
    const charCards = [];

    // Create a DIV block for each character's stats
    for (let charKey in this.state.chars) {
      const char = this.state.chars[charNum];
      chars.push(<CharCard char={char} charKey={charKey} key={char} />);
    }
    return (
      <div className="container selectChar">
        <div className="textSide">
          {header}
          {paragraph}
        </div>
        <div className="inputSide">
          <div>{charCards.slice(0, 2)}</div>
          <div>{charCards.slice(2)}</div>
        </div>
      </div>
    );
  }
}
