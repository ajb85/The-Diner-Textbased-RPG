import React, { Component } from "react";

export default function Death() {
  function restart() {
    window.location.reload();
  }
  return (
    <div className="container death">
      <p style={{ marginBottom: "20px" }}>You have died.</p>
      <button onClick={() => restart()}>Drag My Corpse Outside</button>
    </div>
  );
}
