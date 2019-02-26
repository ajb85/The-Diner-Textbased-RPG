import Weapon from "./Weapon.js";
import gFunc from "../../../GlobalFunctions.js";

export default class Sharp extends Weapon {
  constructor(attrs) {
    super(attrs);
    this.critMulti = 2; //attrs.critMulti;
    this.attributes.critMulti = this.critMulti;
  }

  slash() {
    this.attributes.attackName = "Slash";
    return gFunc.getAttackObj(this.attributes);
  }

  stab() {
    this.attributes.attackName = "Stab";
    return gFunc.getAttackObj(this.attributes);
  }
}
