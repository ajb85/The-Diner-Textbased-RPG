import React, { Component } from "react";
import CreateAccount from "./components/SelectCharacter/CreateAccount.js";

export default class PageMgr extends Component {
  constructor() {
    super();
    this.state = { loadPage: <CreateAccount loadPage={this.loadNewPage} /> };
  }

  loadNewPage = loadPage => {
    this.setState({ loadPage });
  };

  render() {
    let loadPage;
    if (this.state && this.state.loadPage) {
      loadPage = this.state.loadPage;
    }
    return <div>{loadPage}</div>;
  }
}
