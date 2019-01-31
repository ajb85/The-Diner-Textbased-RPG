import React, { Component } from "react";
import CreateCombatButton from "./HelperComps/CreateCombatButton.js";
import CreateUserList from "./HelperComps/CreateUserList.js";
import api from "./api.js";

// props: changeGame, char, userList
export default class Diner extends Component {
  constructor(props) {
    super(props);

    //binding 'this' to all my functions so I don't have to when they're invoked
    this.handleTyping = this.handleTyping.bind(this);
    this.submitChat = this.submitChat.bind(this);
    // this.fakeServer = this.fakeServer.bind(this); // Local
    this.onChatReceive = this.onChatReceive.bind(this);
    this.onReceiveUserList = this.onReceiveUserList.bind(this); // Local
    this.receiveRequestAnswer = this.receiveRequestAnswer.bind(this);
    this.updateStateCondition = this.updateStateCondition.bind(this);

    this.state = {
      typing: "",
      chatlog: [],
      userList: ["Loading..."],
      selected: "",
      challenging: "",
      aggressors: []
    };
    // this.receiveUserList(this.props.userList); // Local
    api.updateUserList(this.onReceiveUserList);
    api.getUserList(this.onReceiveUserList);
    api.receiveChat(this.onChatReceive);
  }
  componentDidMount() {
    // // Local - Fake userlist generation
    // this.receiveUserList(
    //   [
    //     "Average Joe",
    //     "Tonya",
    //     "Lego",
    //     this.props.char.name,
    //     "Shawn"
    //   ].sort()
    // );
    //
    // this.receiveRequest("Tonya");
  } // Local
  updateStateCondition(condition, value) {
    this.setState({ [condition]: value });
  }
  handleTyping(e) {
    const maxCharLimit = 164;
    if (e.target.value.length <= maxCharLimit) {
      this.setState({ typing: e.target.value });
    }
  }
  submitChat(e) {
    e.preventDefault();
    const message = this.state.typing;
    if (message.length) {
      api.sendChat(`${this.props.char.name} says: ${message}`); // Live
      // this.fakeServer(this.props.char.name, message); // Local
      this.setState({ typing: "" });
    }
    return false;
  }
  // fakeServer(name, message) { // Local
  //   this.onChatReceive(`${name} says: ${message}`);
  // }
  onChatReceive(message) {
    let { chatlog } = this.state;
    chatlog.push(message);
    if (chatlog.length > 50) {
      chatlog.shift();
    }
    this.setState({ chatlog });
  }

  onReceiveUserList(userList) {
    this.setState({ userList });
  }
  // receiveUserList(userList) { // Local
  //   this.setState({ userList }); // Local
  // }  // Local
  receiveRequest(res) {
    // Save aggressor names in an array so they can be queued and index zero
    // highlighted in the user list
    let { aggressors } = this.state;
    aggressors.push(res);
    this.setState({ aggressors: [...aggressors] });
  }
  receiveRequestAnswer(res) {
    if (res) {
      // Load fight
    } else {
      //Untested
      //moved to helper --> this.cancelChallenge();
    }
  }

  render() {
    const { aggressors, selected, challenging } = this.state;
    const stateConditions = { aggressors, selected, challenging };
    return (
      <div className="container diner">
        <div className="chatContainer">
          <div className="chatlog">{this.state.chatlog.join("\n")}</div>
          <form onSubmit={this.submitChat}>
            <input
              type="text"
              onChange={this.handleTyping}
              value={this.state.typing}
            />
            <button>Talk</button>
          </form>
        </div>
        <div className="buttonsAndList">
          <div className="users">
            <CreateUserList
              userList={this.state.userList}
              stateConditions={stateConditions}
              updateStateCondition={this.updateStateCondition}
              changeGame={this.props.changeGame}
              char={this.props.char}
            />
          </div>
          <div className="actionButton" />
        </div>
      </div>
    );
  }
}

// <CreateCombatButton
//   stateConditions={stateConditions}
//   updateStateCondition={this.updateStateCondition}
// />
