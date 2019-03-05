import gFunc from "../../../GlobalFunctions.js";

export default class Weapon {
  constructor(attrs) {
    //super(attrs);
    this.attributes = {
      damage: attrs.damage,
      accuracy: attrs.accuracy,
      critChance: attrs.critChance
    };
    this.name = attrs.name;
  }
  // acc, damage, crit, critMulti, attackName
  basicAttack() {
    this.attributes.attackName = "Punch";
    return gFunc.getAttackObj(this.attributes);
  }
}
