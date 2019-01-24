import React, { Component } from "react";
import gFuncs from "./globalFunctions.js";
import Heroes from "./Classes/Heroes.js";

class App extends Component {
  render() {
    let rando = gFuncs.getRand(1, 10);
    return <div>{rando}</div>;
  }
}

export default App;
