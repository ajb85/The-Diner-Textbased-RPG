import Weapon from "./Weapon.js";
import gFunc from "../../../GlobalFunctions.js";

export default class Blunt extends Weapon {
  constructor(attrs) {
    super(attrs);

    this.attributes.critMulti = 2;
  }

  smack() {
    this.attributes.attackName = "Smack";
    return gFunc.getAttackObj(this.attributes);
  }

  smash() {
    this.attributes.attackName = "Smash";
    return gFunc.getAttackObj(this.attributes);
  }
}
