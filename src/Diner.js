import React, { Component } from "react";
import CreateCombatButton from "./HelperComps/CreateCombatButton.js";
import CreateUserList from "./HelperComps/CreateUserList.js";

// props: loadPage, char
export default class Diner extends Component {
  constructor(props) {
    super(props);

    //binding 'this' to all my functions so I don't have to when they're invoked
    this.handleTyping = this.handleTyping.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.fakeServer = this.fakeServer.bind(this);
    this.receiveChat = this.receiveChat.bind(this);
    this.receiveUserList = this.receiveUserList.bind(this);
    this.challengeUser = this.challengeUser.bind(this);
    this.cancelChallenge = this.cancelChallenge.bind(this);
    this.receiveRequestAnswer = this.receiveRequestAnswer.bind(this);

    this.state = {
      typing: "",
      chatlog: "",
      userList: [],
      selected: "",
      challenging: "",
      aggressors: []
    };
  }
  componentDidMount() {
    //Fake userlist generation
    this.receiveUserList(
      [
        "Average Joe",
        "Tonya",
        "Lego",
        this.props.char.name,
        "Shawn",
        "He",
        "Who",
        "Did",
        "The",
        "thing",
        "we",
        "all",
        "know",
        "about",
        "yellow",
        "pink",
        "orange",
        "fox",
        "brown",
        "amost",
        "there",
        "just",
        "need",
        "a few",
        "more",
        "names",
        "and I",
        "think that",
        "should do",
        "it, right?"
      ].sort()
    );

    this.receiveRequest("Tonya");
  }
  updateStateConditions(conditionUpdate) {
    this.setState({ conditionUpdate });
  }
  handleTyping(e) {
    const maxCharLimit = 164;
    if (e.target.value.length <= maxCharLimit) {
      this.setState({ typing: e.target.value });
    }
  }
  handleChatSubmit(e) {
    e.preventDefault();
    const message = this.state.typing;
    this.fakeServer(this.props.char.name, message);
    this.setState({ typing: "" });
    return false;
  }
  fakeServer(name, message) {
    this.receiveChat(`${name} says: ${message}`);
  }
  receiveChat(message) {
    let { chatlog } = this.state;
    chatlog += "\n" + message + "\n";
    this.setState({ chatlog });
  }
  receiveUserList(userList) {
    this.setState({ userList });
  }
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
          <div className="chatlog">{this.state.chatlog}</div>
          <form onSubmit={this.handleChatSubmit}>
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
            />
          </div>
          <div className="actionButton">
            <CreateCombatButton
              stateConditions={stateConditions}
              updateStateCondition={this.updateStateConditions}
            />
          </div>
        </div>
      </div>
    );
  }
}
