import React from "react";
import ReactDOM from "react-dom";

import {Players} from "./../api/players";

export default class AddPlayer extends React.Component{
  render(){
    return (
        <div className="item">
          <form className="form" onSubmit={this.handleSubmit.bind(this)}>
            <input className="form__input" type="text" name="playerName" placeholder="Player Name"/>
            <button className="button">Add Player</button>
          </form>
        </div>
    );
  }

  handleSubmit(e){
    let playerName=e.target.playerName.value;

    //Preventing Refresh as its default behaviour
    e.preventDefault();

    if(playerName){
      e.target.playerName.value="";
      Players.insert({
        name:playerName,
        score: 0
      });
    }
  };
}
