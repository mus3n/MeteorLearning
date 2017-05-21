import React from 'react';
import {Meteor} from "meteor/meteor";
import {Links} from "../api/links";

export default class AddLink extends React.Component{

  constructor(props){
    super(props);
    this.state={
      url: ''
    };
  }

  onChange(e){
    this.setState(
      {
        url: e.target.value
      }
    );
  }

  onSubmit(e){
    e.preventDefault();
    //Fetch URL from Input and Insert
    const url = this.state.url;

    if(url){
      Meteor.call("links.insert",url, (err, res)=>{
        if(!err){
            this.setState({url:''});
        }
      });

    }
  }

  render(){
    return (
      <div>
        <p>Add a Link</p>

        <form onSubmit={this.onSubmit.bind(this)}>
              <input
                placeholder="Type URL here..."
                value={this.state.url}
                onChange={this.onChange.bind(this)}
              />
              <button type="submit">Add Link</button>
        </form>
    </div>
    );
  }

}
