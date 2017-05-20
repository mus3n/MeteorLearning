import React from 'react';
import {Meteor} from "meteor/meteor";
import {Links} from "../api/links";

export default class AddLink extends React.Component{
  onSubmit(e){
    e.preventDefault();
    //Fetch URL from Input and Insert
    const url = this.refs.url.value.trim();

    if(url){
      Meteor.call("links.insert",url);
      this.refs.url.value="";
    }
  }

  render(){
    return (
      <div>
        <p>Add a Link</p>

        <form onSubmit={this.onSubmit.bind(this)}>
              <input type="text" ref="url" placeholder="Type URL here..." />
              <button type="submit">Add Link</button>
        </form>
    </div>
    );
  }

}
