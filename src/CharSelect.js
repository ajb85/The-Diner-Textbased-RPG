import React, { Component } from "react";
import textData from "./data/charSelect.json";
import gFunc from "./GlobalFunctions.js";
import Hero from "./Classes/Heroes.js";
import GamePageMgr from "./PageManagers/GamePageMgr.js";
// Props = {name, loadPage}
export default class CharSelect extends Component {
  constructor(props) {
    super(props);
    this.rollChar = this.rollChar.bind(this);
    this.handleCharSelect = this.handleCharSelect.bind(this);
    this.createCharBlock = this.createCharBlock.bind(this);
    this.state = {
      chars: {
        one: this.rollChar(),
        two: this.rollChar(),
        three: this.rollChar()
      }
    };
  }
  createCharBlock(char, key) {
    return (
      <div className="charBlock" key={key}>
        <div>
          <h2>{char.name}</h2>
        </div>
        <div className="statContainer">
          <div className="stat">
            <p>Appetite:</p> <p>{char.str}</p>
          </div>
          <div className="stat">
            <p>Etiquette:</p> <p>{char.dex}</p>
          </div>
          <div className="stat">
            <p>Foodie:</p> <p>{char.intel}</p>
          </div>
          <div className="stat">
            <p>Luck:</p> <p>{char.luck}</p>
          </div>
        </div>
        <div>
          <button data-char={key} onClick={this.handleCharSelect}>
            This Is Me
          </button>
        </div>
      </div>
    );
  }
  rollChar() {
    const attributes = ["str", "dex", "intel", "luck"];
    let newChar = { name: this.props.name };
    attributes.forEach(attr => (newChar[attr] = gFunc.getRand(1, 10)));
    return new Hero(newChar);
  }
  handleCharSelect(e) {
    const charKey = e.target.dataset.char;
    const selection = this.state.chars[charKey];
    this.props.loadPage(
      <GamePageMgr loadPage={this.props.loadPage} char={selection} />
    );
  }
  render() {
    const header = <h1>{textData.h1}</h1>;
    const paragraph = gFunc.splitString(textData.p);
    let chars = [];
    // Create a DIV block for each character's stats
    for (let char in this.state.chars) {
      chars.push(this.createCharBlock(this.state.chars[char], char));
    }
    return (
      <div className="container selectChar">
        <section>
          <div className="textSide">{chars}</div>
          <div className="inputSide">
            {header}
            {paragraph}
          </div>
        </section>
      </div>
    );
  }
}
