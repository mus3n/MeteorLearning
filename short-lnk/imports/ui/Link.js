import React from 'react';
import {browserHistory} from 'react-router';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from "meteor/meteor";

import {Links} from "../api/links";
import LinksList from "./LinksList";

export default class Link extends React.Component{
  onLogout(){
      Accounts.logout();
  }

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
            <h1>Short Lnk</h1>

            <LinksList/>

            App here

            <p>Add a Link</p>

            <form onSubmit={this.onSubmit.bind(this)}>
                  <input type="text" ref="url" placeholder="Type URL here..." />
                  <button type="submit">Add Link</button>
            </form>

            <button onClick={this.onLogout.bind(this)}>Logout</button>
        </div>


      );
  }
}
