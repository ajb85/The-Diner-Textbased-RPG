import React, { Component } from "react";
import weapons from "../data/weapons.json";
// props: char
export default class SelectWeapon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: ""
    };
  }

  render() {
    return <div className="selectWeapon" />;
  }
}
