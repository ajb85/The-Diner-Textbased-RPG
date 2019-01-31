//import React, {Component} from "react";
import gFunc from "../GlobalFunctions.js";
export default class Weapon {
  constructor(attrs) {
    //super(attrs);
    this.name = attrs.name;
    this.damage = attrs.dmg;
    this.accuracy = attrs.acc;
    this.critChance = attrs.crit;
    this.attributes = {
      name: this.name,
      dmg: this.damage,
      acc: this.accuracy,
      crit: this.critChance
    };
  }
  // acc, dmg, crit, critMulti, attackName
  basicAttack() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Punch";
    return gFunc.getAttackObj(stats);
  }
}
