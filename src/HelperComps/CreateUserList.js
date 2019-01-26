import React, {Component} from 'react';

// !!!!!!!!! This file is currently not working.  It's a copy paste of old code and needs to be updated !!!!!!!!!!!!!!!!



/* props: userList
          stateConditions:{selected, challenging, aggressors}
          callbacks: {selectUser, challengeUser, cancelChallenge}*/
export default class CreateUserList extends Component {
  constructor(props){
    super(props);

    this.selectUser=this.selectUser.bind(this);
  }

  selectUser(e) {
    let { selected, challenging } = this.state;
    // Remove highlight from last selected user UNLESS they were challenging
    // note: selected only exists here if the last time this function was ran
    // someone was selected
    // Read the follow as: "if someone was selected last time and they weren't
    // challenging then reset their className"
    if (selected && selected !== challenging) {
      selected.className = "";
    }
    // For a new selected user, highlight its background
    // Read: if the last target isn't the same as the new one
    if (selected !== e.target && e.target !== challenging) {
      e.target.className += "selected";
      this.setState({ selected: e.target });
      // If its the same target as before but they haven't been challenge,
      // deselect them.  If they've been challenging, we will not change their
      // class from selecting users
    } else if (selected === e.target && selected !== challenging) {
      selected.className = "";
      this.setState({ selected: "" });
    }
  }
render(){
  let userList = this.props.stateConditions.userList.map(user => {
    // React won't let me create an element then add a class later
    // so...sorry DRY, have to write it twice :(
    if(this.props.stateConditions.aggressors && this.props.stateConditions.aggressors[0] === user){
      // Create with "aggressor" class
      return (<p className="aggressor" onClick={this.selectUser}>
        {user}
      </p>);
    }
    // Create with no class if not the current aggressor
    return (<p onClick={this.selectUser}>
      {user}
    </p>);
  });
  } // end if
  return (userList);
}

}
