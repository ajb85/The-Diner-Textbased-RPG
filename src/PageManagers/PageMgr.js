import React, { Component } from "react";
import CreateAcc from "../CreateAcc.js";

export default class PageMgr extends Component {
  constructor(props) {
    super(props);
    this.loadNewPage = this.loadNewPage.bind(this);
    this.state = { loadPage: <CreateAcc loadPage={this.loadNewPage} /> };
  }
  loadNewPage(loadPage) {
    this.setState({ loadPage });
  }
  render() {
    let loadPage;
    if (this.state && this.state.loadPage) {
      loadPage = this.state.loadPage;
    }
    return <div>{loadPage}</div>;
  }
}
