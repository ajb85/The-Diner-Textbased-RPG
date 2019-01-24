import React, { Component } from "react";
// props: loadPage, char
export default class Diner extends Component {
  constructor(props) {
    super(props);
    this.handleTyping = this.handleTyping.bind(this);
    this.handleChatSubmit = this.handleChatSubmit.bind(this);
    this.fakeServer = this.fakeServer.bind(this);
    this.receiveChat = this.receiveChat.bind(this);
    this.receiveUserList = this.receiveUserList.bind(this);
    this.selectUser = this.selectUser.bind(this);

    this.state = { typing: "", chatlog: "", userList: [], selectedUser: "" };
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
  receiveUserList(list) {
    const userList = list.map(user => (
      <p className="username" onClick={this.selectUser}>
        {user}
      </p>
    ));
    this.setState({ userList });
  }
  selectUser(e) {
    console.log(e.target.value);
  }

  render() {
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
          <div className="users">{this.state.userList}</div>
          <div className="actionButton">3</div>
        </div>
      </div>
    );
  }
}
