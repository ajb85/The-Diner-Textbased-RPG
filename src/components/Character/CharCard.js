import React, { Component } from "react";
/*
Props:
char={this.state.chars[charNum]}
charKey={charKey}
*/

export default function CharCard(props) {
  const buttonClass = getButtonClass(props.char);
  const { name, str, dex, intel, luck } = props.char;

  return (
    <div
      className="charCard"
      onClick={() => this.handleCharSelect(props.charKey)}
    >
      <div>
        <h2 className="nameTitle">{props.char.name}</h2>
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

function getButtonClass(char) {
  if (char.str >= char.dex && char.str >= char.intel) {
    return "strBG";
  } else if (char.dex >= char.str && char.dex >= char.intel) {
    return "dexBG";
  } else if (char.intel >= char.str && char.intel >= char.dex) {
    return "intelBG";
  }
  // Currently not used
  return "luckBG";
}
