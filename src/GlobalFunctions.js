import React from "react";

function getRand(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function splitString(string) {
  return string.split("\n").map((para, i) => <p key={i}>{para}</p>);
}

export default { getRand, splitString };
