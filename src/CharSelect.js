import React, { Component } from "react";
import textData from "./data/charSelect.json";
import gFunc from "./GlobalFunctions.js";
import Hero from "./Classes/Heroes.js";
import GamePageMgr from "./PageManagers/GamePageMgr.js";
// Props = {name, loadPage, userList}
export default class CharSelect extends Component {
  constructor(props) {
    super(props);
    this.rollChar = this.rollChar.bind(this);
    this.handleCharSelect = this.handleCharSelect.bind(this);
    this.createCharCard = this.createCharCard.bind(this);
    this.state = {
      chars: {
        one: this.rollChar(),
        two: this.rollChar(),
        three: this.rollChar(),
        four: this.rollChar()
      }
    };
  }
  createCharCard(char, key) {
    let buttonColor;
    if (char.str >= char.dex && char.str >= char.intel) {
      buttonColor = "strBG";
    } else if (char.dex >= char.str && char.dex >= char.intel) {
      buttonColor = "dexBG";
    } else if (char.intel >= char.str && char.intel >= char.dex) {
      buttonColor = "intelBG";
    } else {
      buttonColor = "luckBG";
    }
    return (
      <div
        className="charCard"
        key={key}
        data-char={key}
        onClick={this.handleCharSelect}
      >
        <div>
          <h2 className="nameTitle">{char.name}</h2>
          <h2 className="thisIsMeTitle">This is Me</h2>
        </div>
        <div className="statContainer">
          <div className="stat">
            <p>Appetite:</p> <p className="str">{char.str}</p>
          </div>
          <div className="stat">
            <p>Etiquette:</p> <p className="dexLight">{char.dex}</p>
          </div>
          <div className="stat">
            <p>Foodie:</p> <p className="intel">{char.intel}</p>
          </div>
          <div className="stat">
            <p>Luck:</p> <p className="luck">{char.luck}</p>
          </div>
        </div>

        <button className={buttonColor}>This Is Me</button>
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
    let charCard;
    let search = e.target;
    // User can click on any element in the char Card so I have to find
    // the parent with all the data
    while (!charCard) {
      console.log(search);
      if (search.dataset.char) {
        charCard = search;
      }
      search = search.parentElement;
    }
    const charKey = charCard.dataset.char;
    const selection = this.state.chars[charKey];
    this.props.loadPage(
      <GamePageMgr
        loadPage={this.props.loadPage}
        char={selection}
        userList={this.props.userList}
      />
    );
  }
  render() {
    const header = <h1>{textData.h1}</h1>;
    const paragraph = gFunc.splitString(textData.p);
    let chars = [];
    // Create a DIV block for each character's stats
    for (let char in this.state.chars) {
      chars.push(this.createCharCard(this.state.chars[char], char));
    }
    return (
      <div className="container selectChar">
        <div className="textSide">
          {header}
          {paragraph}
        </div>
        <div className="inputSide">
          <div>{chars.slice(0, 2)}</div>
          <div>{chars.slice(2)}</div>
        </div>
      </div>
    );
  }
}
