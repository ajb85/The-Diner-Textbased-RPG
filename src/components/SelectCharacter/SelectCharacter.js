import React, { Component } from "react";
import textData from "../../data/charSelect.json";
import gFunc from "../../GlobalFunctions.js";
import Character from "./Character.js";
import GameLoader from "../GameLoader/GameLoader.js";
import CharCard from "./CharCard.js";

/*
Props:
loadPage={this.props.loadPage}
name={this.state.name}
userList={res}
*/

export default function CharSelect(props) {
  const rollChar = () => {
    // Build character attrs object for the class, return the class object
    const attributes = ["str", "dex", "intel", "luck"];
    let newChar = { name: props.name };
    attributes.forEach(attr => (newChar[attr] = gFunc.getRand(1, 10)));
    return new Character(newChar);
  };

  const handleCharSelect = char => {
    // Pass the selected char to the GameLoader
    this.props.loadPage(<GameLoader loadPage={props.loadPage} char={char} />);
  };

  const header = <h1>{textData.h1}</h1>;
  const paragraph = gFunc.splitString(textData.p);
  const charCards = [];

  for (let i = 0; i <= 4; i++) {
    const char = this.rollChar();
    charCards.push(<CharCard char={char} key={char} />);
  } // end loop

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
