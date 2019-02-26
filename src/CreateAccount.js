import React, { Component } from "react";
import SelectCharacter from "./components/SelectCharacter/SelectCharacter.js";
import textData from "./data/createAcc.json";
import gFunc from "./GlobalFunctions";
import api from "./api.js";

export default class CreateAcc extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  // Submits the name to the server.
  submitName = e => {
    e.preventDefault();
    api.sendLogin(this.state.name, this.isNameApproved);
  };

  //Receive response from server, move to next page or deny login
  isNameApproved = approved => {
    if (approved) {
      this.props.loadPage(
        <SelectCharacter
          loadPage={this.props.loadPage}
          name={this.state.name}
        />
      );
    } else {
      this.setState({ badLogin: true });
    }
  };

  // Update state
  onNameInputChange = e => {
    const maxNameCharLimit = 13;
    const input = e.target.value;
    if (input.length < maxNameCharLimit) {
      this.setState({ name: input });
    }
  };
  render() {
    let submitBtn = <button className="noBtn" />;
    let header, paragraph;

    // Check the name is long enough then display the button
    if (this.state && this.state.name && this.state.name.length > 2) {
      submitBtn = (
        <button className="realBtn" onClick={() => this.submitName()}>
          My name is {this.state.name}
        </button>
      );
    }

    // Load text based on where the user is.  If they tried to
    // login with a name of someone already logged in, they'll get
    // a "badlogin" and the text will change
    if (this.state && !this.state.badLogin) {
      header = <h1>{textData.intro.h1}</h1>;
      paragraph = gFunc.splitString(textData.intro.p);
    } else {
      header = gFunc.splitString(textData.badLogin.p);
    }
    return (
      <div className="container createAcc">
        <section>
          <div className="textSide">
            {header}
            {paragraph}
          </div>
          <div className="inputSide">
            <input
              className="inputName"
              onChange={this.onNameInputChange}
              placeholder="So, what's your name?"
              value={this.state.name}
              autoFocus={true}
            />
            {submitBtn}
          </div>
        </section>
      </div>
    );
  }
}
