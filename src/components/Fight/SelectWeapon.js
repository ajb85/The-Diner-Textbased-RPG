import React, { Component } from "react";
import weaponsData from "../../data/weapons.json";
import gFunc from "../../GlobalFunctions.js";

// props: char, pickWeapon
export default class SelectWeapon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapons: { one: "", two: "", three: "" }
    };
    this.populateNewWeapons = this.populateNewWeapons.bind(this);
    this.updateWeaponState = this.updateWeaponState.bind(this);
    this.populateNewWeapons();
  }
  populateNewWeapons() {
    let { weapons } = this.state;
    const conversionLibrary = ["str", "dex", "intel"];
    // Iterate over the weapons state (so I can easily adjust num of weapons later )
    // and pick a random category and a random weapon from each category
    for (let weaponNum in weapons) {
      // Random number between 0 and number of weapon categories (str, dex, intel)
      const categoryIndex = gFunc.getRand(
        0,
        Object.keys(weaponsData).length - 1
      );
      // Convert that number into a key for the weapons object
      const category = conversionLibrary[categoryIndex];
      // Each category contains an array of weapons.  Pick a random number to
      // select a weapon
      const weaponIndex = gFunc.getRand(0, weaponsData[category].length - 1);
      // Save the weapon in state
      weapons[weaponNum] = weaponsData[category][weaponIndex];
      weapons[weaponNum].category = category;
    }
  }
  updateWeaponState(num) {
    const selection = this.state.weapons[num];
    this.props.pickWeapon(selection);
  }

  render() {
    const { weapons } = this.state;
    // Yes I did a Object.keys ==> map instead of for(x in y).  Yes, I did it becausae I'm tired.  Get over it
    const weaponSelection = Object.keys(this.state.weapons).map(
      (weaponNum, i) => (
        <div key={i} className="weaponSelection">
          <p className={weapons[weaponNum].category}>
            {weapons[weaponNum].name}
          </p>
          <div className="weaponStats">
            <p>Damage: {weapons[weaponNum].damage}</p>
            <p>Accuracy: {weapons[weaponNum].accuracy}</p>
            <p>Crit Chance: {weapons[weaponNum].critChance}</p>
            <button onClick={() => this.updateWeaponState(weaponNum)}>
              Pick Up
            </button>
          </div>
        </div>
      )
    );
    return <div className="weaponsWindow">{weaponSelection}</div>;
  }
}
