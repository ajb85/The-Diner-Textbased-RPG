import Weapon from "./Weapon.js";
import gFunc from "../GlobalFunctions.js";

export default class Blunt extends Weapon {
  constructor(attrs) {
    super(attrs);
    this.critMulti = 2; //attrs.critMulti;
    this.attributes.critMulti = this.critMulti;
  }

  smack() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Smack";
    return gFunc.getAttackObj(stats);
  }

  smash() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Smash";
    return gFunc.getAttackObj(stats);
  }
}
