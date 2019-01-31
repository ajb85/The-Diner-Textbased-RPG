import React, { Component } from "react";
import SelectWeapon from "./HelperComps/SelectWeapon.js";
import Blunt from "./Classes/Blunt.js";
import Sharp from "./Classes/Sharp.js";
import Food from "./Classes/Food.js";
// props: char, opponent
export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: "",
      opponentReady: true
    };
    this.pickWeapon = this.pickWeapon.bind(this);
    this.createWeaponClass = this.createWeaponClass.bind(this);
  }
  pickWeapon(weapon) {
    this.setState({ weapon: weapon });
  }
  createWeaponClass() {
    const { weapon } = this.state;
    let weaponClass;

    if (weapon.category === "str") {
      weaponClass = new Blunt(weapon);
    } else if (weapon.category === "dex") {
      weaponClass = new Sharp(weapon);
    } else {
      weaponClass = new Food(weapon);
    }
    return weaponClass;
  }

  render() {
    let currentWindow = [];

    if (this.state && !this.state.weapon) {
      currentWindow = [
        <p>You look around for something to use as a weapon and you find...</p>,
        <SelectWeapon pickWeapon={this.pickWeapon} char={this.props.char} />
      ];
    } else if (this.state && this.state.weapon) {
      const weaponClass = this.createWeaponClass();
    }
    return (
      <div className="container fight">
        <div className="opponent">{this.props.opponent}</div>
        <div className="user">
          <div className="currentWindow">{currentWindow}</div>
          <div className="hud">
            <div className="hudVitals">
              <p>{this.props.char.name}</p>
              <p>{this.props.char.hp}hp</p>
            </div>
            <div className="hudStats">
              <p className="str">{this.props.char.str}</p>
              <p className="dex">{this.props.char.dex}</p>
              <p className="intel">{this.props.char.intel}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
