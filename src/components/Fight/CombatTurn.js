import React from "react";
// Props: executeAttack, opponent, char, weapon
export default function CombatTurn(props) {
  function getAttackMethods() {
    // Look up attack methods on object prototypes
    const weaponClass = Object.getPrototypeOf(props.weapon);
    const weaponParentClass = Object.getPrototypeOf(weaponClass);
    const weaponMethods = Object.getOwnPropertyNames(weaponClass);
    const weaponParentMethods = Object.getOwnPropertyNames(weaponParentClass);

    // Methods[0] is constructor, so omit them
    return [...weaponMethods.slice(1), ...weaponParentMethods.slice(1)];
  }

  // Render
  console.log("Combat Turn");
  const attacks = getAttackMethods();
  const attackButtons = attacks.map(methodName => {
    const attackOBJ = props.weapon[methodName]();
    return (
      <button
        className="selectAttack"
        onClick={() => props.executeAttack(attackOBJ)}
      >
        {attackOBJ.attackName}
      </button>
    );
  });
  return <div className="selectAttack">{attackButtons}</div>;
}
