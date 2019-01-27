import React, { Component } from "react";
import SelectWeapon from "./HelperComps/SelectWeapon.js";
// props: char, opponent
export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: ""
    };
  }

  render() {
    let currentWindow;

    if (this.state && !this.state.weapon) {
      currentWindow = <SelectWeapon char={this.props.char} />;
    }
    return (
      <div className="container fight">
        <div className="opponent">{this.props.opponent}</div>
        <div className="user">{currentWindow}</div>
      </div>
    );
  }
}
