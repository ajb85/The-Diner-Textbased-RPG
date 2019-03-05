import Weapon from "./Weapon.js";
import gFunc from "../../../GlobalFunctions.js";

export default class Sharp extends Weapon {
  constructor(attrs) {
    super(attrs);

    this.attributes.critMulti = 2;
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
