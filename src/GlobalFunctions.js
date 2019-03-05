import React from "react";

function getRand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function splitString(string) {
  return string.split("\n").map((para, i) => <p key={i}>{para}</p>);
}

function getAttackObj(stats) {
  const attackOBJ = { attackName: stats.attackName };
  attackOBJ.damage = 0;
  attackOBJ.accRoll = getRand(0, 100);

  if (attackOBJ.accRoll >= 1 - stats.accuracy) {
    attackOBJ.hit = true;
    // If the roll exceeds the required accuracy, deal damage
    attackOBJ.damage = stats.damage;

    //If dealing damage, calc for a critical
    attackOBJ.critRoll = getRand(0, 100);
    if (attackOBJ.critRoll >= 100 - stats.crit) {
      attackOBJ.damage = Math.floor(attackOBJ.damage * stats.critMulti);
      attackOBJ.crit = true;
    } else {
      // no crit
    }
  } else {
    // no hit
  }

  return attackOBJ;
}

export default { getRand, splitString, getAttackObj };
