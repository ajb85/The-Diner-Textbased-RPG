import React, { Component } from "react";

export default class Death extends Component {
  constructor(props) {
    super(props);

    this.restart = this.restart.bind(this);
  }
  restart() {
    window.location.reload();
  }
  render() {
    return (
      <div className="container death">
        <p>You have died.</p>
        <button onClick={this.restart}>Drag My Corpse Out of the Diner</button>
      </div>
    );
  }
}
