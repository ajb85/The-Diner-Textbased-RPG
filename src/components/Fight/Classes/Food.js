import Weapon from "./Weapon.js";
import gFunc from "../../../GlobalFunctions.js";

export default class Food extends Weapon {
  constructor(attrs) {
    super(attrs);

    this.attributes.critMulti = 3.5;
  }

  throw() {
    this.attributes.attackName = "Throw Food";
    return gFunc.getAttackObj(this.attributes);
  }

  slap() {
    this.attributes.attackName = "Slap";
    return gFunc.getAttackObj(this.attributes);
  }
}
