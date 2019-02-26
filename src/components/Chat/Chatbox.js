import React from "react";

export default function Chatbox(props) {
  return (
    <form onSubmit={this.submitChat}>
      <input
        type="text"
        onChange={this.handleTyping}
        value={this.state.typing}
      />
      <button>Talk</button>
    </form>
  );
}
