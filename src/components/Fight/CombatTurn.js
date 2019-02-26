import React, { Component } from "react";
// Props: executeAttack, opponent, char, weapon
export default class CombatTurn extends Component {
  constructor(props) {
    super(props);
    this.getAttackMethods = this.getAttackMethods.bind(this);
  }
  getAttackMethods() {
    const weaponClass = Object.getPrototypeOf(this.props.weapon);
    const weaponParentClass = Object.getPrototypeOf(weaponClass);
    const weaponMethods = Object.getOwnPropertyNames(weaponClass);
    const weaponParentMethods = Object.getOwnPropertyNames(weaponParentClass);

    return [...weaponMethods.slice(1), ...weaponParentMethods.slice(1)];
  }

  render() {
    const attacks = this.getAttackMethods();
    const attackButtons = attacks.map(methodName => {
      const attackOBJ = this.props.weapon[methodName]();
      return (
        <button
          className="selectAttack"
          onClick={this.props.executeAttack.bind(this, attackOBJ)}
        >
          {attackOBJ.attackName}
        </button>
      );
    });
    return attackButtons;
  }
}
