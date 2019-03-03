import React, { Component } from "react";
import Chatlog from "../Chatlog/Chatlog.js";
import SelectWeapon from "./SelectWeapon.js";
import CombatTurn from "./CombatTurn.js";
import Blunt from "./Classes/Blunt.js";
import Sharp from "./Classes/Sharp.js";
import Food from "./Classes/Food.js";
import Death from "./Death.js";
import api from "../../api.js";
// props: char, opponent, gamepage
export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: "",
      hp: this.props.char.hp,
      opponentReady: true,
      opponentHP: 100,
      turn: 0
    };
  }

  componentDidMount() {
    api.toggleStatus(this.props.char.name);
  }

  pickWeapon = weapon => {
    this.setState({ weapon: this.createWeaponClass(weapon) });
  };

  createWeaponClass = weapon => {
    const { char } = this.props;
    let weaponClass;
    if (weapon.category === "str") {
      weaponClass = new Blunt(weapon);
    } else if (weapon.category === "dex") {
      weaponClass = new Sharp(weapon);
    } else if (weapon.category === "intel") {
      weaponClass = new Food(weapon);
    }
    const msgOBJ = {
      fromUser: char.name,
      toUser: this.props.opponent,
      message: `picks up: ${weaponClass.name}`,
      type: "combat"
    };
    this.sendCombatMessage(msgOBJ);
    return weaponClass;
  };

  sendCombatMessage = msgOBJ => {
    api.sendCombat(msgOBJ);
    this.setState({ turn: 0 });
  };

  damageHP = ({ damage, fromUser }) => {
    if (damage && fromUser !== this.props.char.name) {
      let { hp } = this.state;
      this.setState({ hp: hp - Number(damage) });
    }
    // Only events are turns so if the user received a turn, it must be
    // theirs now
    this.setState({ turn: 1 });
  };

  executeAttack = attackOBJ => {
    const { opponent, char } = this.props;
    let { opponentHP } = this.state;
    opponentHP -= attackOBJ.damage;
    const message = `attacks ${opponent} with ${attackOBJ.attackName}. ${
      attackOBJ.message
    }`;

    const msgOBJ = {
      fromUser: char.name,
      toUser: opponent,
      message,
      damage: attackOBJ.damage,
      type: "combat"
    };
    this.setState({ opponentHP });
    this.sendCombatMessage(msgOBJ);
  };

  render() {
    console.log("fight.js");
    let currentWindow = [];
    let combatLog = [];

    // Lose/Win conditions
    if (this.state.hp <= 0) {
      this.props.updateGameMode("", "death");
    } else if (this.state.opponentHP <= 0) {
      this.props.updateGameMode("", "chat");
      // Send chat message
      const chatOBJ = {
        name: this.props.char.name,
        message: `stands over ${
          this.props.opponent
        } as they are dragged out of the building.`,
        type: "system"
      };
      api.sendChat(chatOBJ);
    }

    if (this.state && !this.state.weapon) {
      // Pick a weapon if the client user doesn't have one
      currentWindow = [
        <p>You look around for something to use as a weapon and you find...</p>,
        <SelectWeapon pickWeapon={this.pickWeapon} char={this.props.char} />
      ];
    } else if (this.state && this.state.weapon && this.state.turn) {
      // If client user has a weapon and its their turn, pick an attack
      currentWindow = (
        <CombatTurn
          executeAttack={this.executeAttack}
          weapon={this.state.weapon}
          char={this.props.char}
          opponent={this.props.opponent}
        />
      );
    } else if (this.state && this.state.weapon) {
      // If client user has a weapon but it's not their turn, they have to wait!
      currentWindow = <p>Wait for your turn...</p>;
    }
    return (
      <div className="container fight">
        <div className="opponent">
          <div className="oppStats">
            <p>{this.props.opponent}</p>
            <p className="str">{this.state.opponentHP}hp</p>
          </div>
          <Chatlog
            context={"combat"}
            listener={api.combatListener}
            damageHP={this.damageHP}
          />
        </div>
        <div className="user">
          <div className="currentWindow">{currentWindow}</div>
          <div className="hud">
            <div className="hudVitals">
              <p>{this.props.char.name}</p>
              <p>{this.state.hp}hp</p>
            </div>
            <div className="hudStats">
              <p className="str">{this.props.char.str}</p>
              <p className="dex">{this.props.char.dex}</p>
              <p className="intel">{this.props.char.intel}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
