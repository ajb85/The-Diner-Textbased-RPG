import Weapon from "./Weapon.js";
import gFunc from "../GlobalFunctions.js";

export default class Sharp extends Weapon {
  constructor(attrs) {
    super(attrs);
    this.critMulti = 2; //attrs.critMulti;
    this.attributes.critMulti = this.critMulti;
  }

  slash() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Slash";
    return gFunc.getAttackObj(stats);
  }

  stab() {
    const stats = Object.create({}, this.attributes);
    stats.attackName = "Stab";
    return gFunc.getAttackObj(stats);
  }
}
