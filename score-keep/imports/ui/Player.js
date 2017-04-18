import React from "react";
import ReactDOM from "react-dom";

import {Players} from "./../api/players";

export default class Player extends React.Component{
  render(){
let itemClassName=`item item--position-${this.props.player.rank}`;

    return (
        <div>
          <div className={itemClassName} key={this.props.player._id}>
            <div className="player">
              <div>
                <h3 className="player__name">
                  {this.props.player.name}
                </h3>
                <p className="player__stats">
                  {this.props.player.rank} place - {this.props.player.position} {this.props.player.score} Points
                </p>
              </div>

              <div className="player__actions">
                <button className="button button--round" onClick={() => {
                  Players.update({_id:this.props.player._id},{$inc: {score: 1}});
                }}>+1</button>

                <button className="button button--round" onClick={() => {
                  Players.update({_id:this.props.player._id},{$inc: {score: -1}});
                }}>-1</button>

                <button className="button button--round" onClick={() => {
                  Players.remove({_id:this.props.player._id});
                }}>X</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

  Player.propTypes={
    player: React.PropTypes.object.isRequired
  }
