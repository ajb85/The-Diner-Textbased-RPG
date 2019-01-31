import Weapon from "./Weapon.js";
import gFunc from "../GlobalFunctions.js";

export default class Food extends Weapon {
  constructor(attrs) {
    super(attrs);
    this.critMulti = 3.5; //attrs.critMulti;
    this.attributes.critMulti = this.critMulti;
  }

  throw() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Throw Food";
    return gFunc.getAttackObj(stats);
  }

  slap() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Slap";
    return gFunc.getAttackObj(stats);
  }
}
