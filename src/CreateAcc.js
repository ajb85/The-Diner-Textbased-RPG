import React, { Component } from "react";
import CharSelect from "./CharSelect.js";
import textData from "./data/createAcc.json";
import gFunc from "./GlobalFunctions";
import api from "./api.js";
export default class CreateAcc extends Component {
  constructor(props) {
    // Props = {loadPage}
    super(props);
    this.submitName = this.submitName.bind(this);
    this.onNameInputChange = this.onNameInputChange.bind(this);
    this.fakeServer = this.fakeServer.bind(this);
    this.loginResponse = this.loginResponse.bind(this);
    this.state = { showBtn: false, name: "", badLogin: 0 };

    //api.receiveLogin(this.loginResponse);
  }
  // Submits the name to the server.
  submitName(e) {
    e.preventDefault();
    //this.fakeServer(this.state.name); // local code
    api.sendLogin(this.state.name, this.loginResponse);
  }
  // Shortterm code to mimic the server receiving/checking/sending data
  fakeServer(name) {
    const currentPlayers = { sdf: true, hello: true };
    if (currentPlayers[name]) {
      this.loginResponse(0);
    } else {
      this.loginResponse({ name: name });
    }
  }
  //Receive response from server, move to next page or deny login
  loginResponse(res) {
    console.log("loginResponse: ", res);
    if (res) {
      this.props.loadPage(
        <CharSelect
          loadPage={this.props.loadPage}
          name={this.state.name}
          userList={res}
        />
      );
    } else {
      this.setState({ badLogin: 1 });
    }
  }
  // Monitors user typing for their name.  Condition checks
  // for valid name happen here so submit can just submit
  onNameInputChange(e) {
    const maxNameCharLimit = 13;
    const input = e.target.value;
    const validName = checkValidName(input);
    this.setState({ showBtn: validName });
    if (e.target.value.length < maxNameCharLimit) {
      this.setState({ name: input });
    }
  }
  render() {
    let submitBtn = <button className="noBtn" />;
    let header, paragraph;

    // Check the name is long enough then display the button
    if (this.state && this.state.showBtn) {
      submitBtn = (
        <button className="realBtn" onClick={this.submitName}>
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

function checkValidName(name) {
  // Names must be 3 characters long
  return name.length >= 3;
}
