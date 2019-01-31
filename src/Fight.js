import React, { Component } from "react";
import SelectWeapon from "./HelperComps/SelectWeapon.js";
import CombatTurn from "./HelperComps/CombatTurn.js";
import Blunt from "./Classes/Blunt.js";
import Sharp from "./Classes/Sharp.js";
import Food from "./Classes/Food.js";
import Death from "./Death.js";
import api from "./api.js";
// props: char, opponent, gamepage
export default class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weapon: "",
      hp: this.props.char.hp,
      opponentReady: true,
      opponentHP: 100,
      combatLog: [],
      turn: 0
    };
    this.pickWeapon = this.pickWeapon.bind(this);
    this.createWeaponClass = this.createWeaponClass.bind(this);
    this.onCombatReceive = this.onCombatReceive.bind(this);
    this.sendCombatMessage = this.sendCombatMessage.bind(this);
    this.executeAttack = this.executeAttack.bind(this);

    api.receiveCombat(this.onCombatReceive);
  }
  pickWeapon(weapon) {
    this.setState({ weapon: this.createWeaponClass(weapon) });
  }
  createWeaponClass(weapon) {
    const { char } = this.props;
    let weaponClass;
    if (weapon.category === "str") {
      weaponClass = new Blunt(weapon);
    } else if (weapon.category === "dex") {
      weaponClass = new Sharp(weapon);
    } else {
      weaponClass = new Food(weapon);
    }
    const message = `${char.name} picks up: ${weaponClass.name}`;
    this.sendCombatMessage(message);
    return weaponClass;
  }
  sendCombatMessage(message) {
    let { opponent } = this.props;
    let { combatLog } = this.state;
    api.sendCombat(opponent, message);
    combatLog.push(message);
    this.setState({ turn: 0 });
    this.setState({ combatLog });
  }
  onCombatReceive(message) {
    let { combatLog, hp } = this.state;
    combatLog.push(message);
    if (combatLog.length > 15) {
      combatLog.shift();
    }
    const combatDamage = "It hits for ";
    let startI = message.indexOf(combatDamage);
    if (startI > -1) {
      startI += combatDamage.length;
      let dmg = "";
      for (let i = 0; i < 2; i++) {
        const dmgStr = message.substr(startI);
        console.log("LF DMG", dmgStr, dmgStr[i]);
        if (Number(dmgStr[i]).toString() === dmgStr[i]) {
          dmg += dmgStr[i];
        }
      }
      console.log("Damage found: ", dmg);
      hp -= Number(dmg);
    }
    this.setState({ hp });
    this.setState({ turn: 1 });
    this.setState({ combatLog });
  }
  executeAttack(attackOBJ) {
    const { opponent, char } = this.props;
    let { opponentHP } = this.state;
    console.log("Opponent Damage: ", attackOBJ.damage);
    opponentHP -= attackOBJ.damage;
    const message = `${char.name} attacks ${opponent} with ${
      attackOBJ.attackName
    }. ${attackOBJ.message}`;
    this.setState({ opponentHP });
    this.sendCombatMessage(message);
  }

  render() {
    let currentWindow = [];
    let combatLog = [];
    let self = this.props;
    if (this.state.hp <= 0) {
      self.changeGame(<Death />);
    } else if (this.state.opponentHP <= 0) {
      api.sendChat(
        `*${this.props.char.name} stands over ${
          this.props.opponent
        }'s corpse as its dragged out the building.*`
      );
      self.changeGame("Diner");
    }

    if (this.state && this.state.combatLog && this.state.combatLog.length) {
      combatLog = [...this.state.combatLog].map(message => <p>{message}</p>);
    }

    if (this.state && !this.state.weapon) {
      currentWindow = [
        <p>You look around for something to use as a weapon and you find...</p>,
        <SelectWeapon pickWeapon={this.pickWeapon} char={this.props.char} />
      ];
    } else if (this.state && this.state.weapon && this.state.turn) {
      currentWindow = (
        <CombatTurn
          executeAttack={this.executeAttack}
          weapon={this.state.weapon}
          char={this.props.char}
          opponent={this.props.opponent}
        />
      );
    } else if (this.state && this.state.weapon) {
      currentWindow = <p>Wait for your turn...</p>;
    }
    return (
      <div className="container fight">
        <div className="opponent">
          <div className="oppStats">
            <p>{this.props.opponent}</p>
            <p>{this.state.opponentHP}hp</p>
          </div>
          <div className="combatLog">{combatLog}</div>
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
