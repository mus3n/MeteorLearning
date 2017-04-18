import React from 'react';
import {browserHistory} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Link extends React.Component{
  onLogout(){
      Accounts.logout();
  }
  render(){
      return (
        <div>
            <h1>Short Lnk</h1>

            App here

            <button onClick={this.onLogout.bind(this)}>Logout</button>
        </div>


      );
  }
}
