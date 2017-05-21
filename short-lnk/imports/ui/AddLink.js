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
        <button className="button" onClick={()=>this.setState({isOpen: true})}>
          + Add Link
        </button>
        <Modal
            isOpen={this.state.isOpen}
            contentLabel="Add Link"
            onAfterOpen={()=> this.refs.url.focus()}
            onRequestClose={this.handleModalClose.bind(this)}
            className="boxed-view__box"
            overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add a Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : ""}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                <input
                  type="text"
                  placeholder="Type URL here..."
                  value={this.state.url}
                  ref = "url"
                  onChange={this.onChange.bind(this)}
                />
                <button className="button" type="submit">Add Link</button>
                <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
          </form>

        </Modal>
    </div>
    );
  }

}
