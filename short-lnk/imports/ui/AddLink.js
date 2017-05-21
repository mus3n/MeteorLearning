import React from 'react';
import {Meteor} from "meteor/meteor";
import {Links} from "../api/links";
import Modal from "react-modal";

export default class AddLink extends React.Component{

  constructor(props){
    super(props);
    this.state={
      url: '',
      isOpen: false,
      error: ''
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

    Meteor.call("links.insert",url, (err, res)=>{
      if(!err){
          this.handleModalClose().bind(this);
      }else{
          this.setState({error: err.reason});
      }
    });
  }

  handleModalClose(){
    this.setState(
      {
        isOpen:false,
        error: '',
        url:''
      }
    );
  }

  render(){
    return (
      <div>
        <button onClick={()=>this.setState({isOpen: true})}>
          + Add Link
        </button>
        <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add Link"
            onAfterOpen={()=> this.refs.url.focus()}
            onRequestClose={this.handleModalClose.bind(this)}
        >
          <h1>Add a Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : ""}
          <form onSubmit={this.onSubmit.bind(this)}>
                <input
                  placeholder="Type URL here..."
                  value={this.state.url}
                  ref = "url"
                  onChange={this.onChange.bind(this)}
                />
                <button type="submit">Add Link</button>
          </form>
          <button onClick={this.handleModalClose.bind(this)}>Cancel</button>
        </Modal>
    </div>
    );
  }

}
