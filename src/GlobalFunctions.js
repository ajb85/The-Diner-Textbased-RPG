import React from "react";

function getRand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function splitString(string) {
  return string.split("\n").map((para, i) => <p key={i}>{para}</p>);
}

function getAttackObj(stats) {
  const accRoll = getRand(0, 100);
  let calcDMG = 0;
  let message = "";

  if (accRoll >= 1 - stats.acc) {
    message += ` It hits for ${stats.dmg}`;
    // If the roll exceeds the required accuracy, deal damage
    calcDMG = stats.dmg;

    //If dealing damage, calc for a critical
    const critRoll = getRand(0, 100);
    if (critRoll >= 1 - stats.crit) {
      message += ` with a critical strike!`;
      calcDMG *= stats.critMulti;
    } else {
      message += "."; // No crit, end sentence
    }
  } else {
    message += ` but misses.`; // Failed acc roll
  }
  return { damage: calcDMG, attackName: stats.attackName, message: message };
}

export default { getRand, splitString, getAttackObj };
