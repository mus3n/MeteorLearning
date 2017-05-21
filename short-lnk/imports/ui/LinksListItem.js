import React from 'react';
import {Meteor} from "meteor/meteor";
import Clipboard from "clipboard";

export default class LinksListItem extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      justCopied: false
    }
  }

  componentDidMount(){
      this.justCopied=false;

      this.clipboard = new Clipboard(this.refs.copy);

      this.clipboard.on("success", ()=>{

          this.setState({justCopied: true});

          window.setTimeout( () => {
            this.setState({ justCopied: false });
          } , 1000);

      });

      this.clipboard.on("error", ()=>{
        alert("Unable to copy, please manually copy the link.");
      });

  };

  componentWillUnmount(){
      this.clipboard.destroy();
  };

  render(){
    return (
      <div>
          <p>URL: {this.props.url}</p>
          <p>shortUrl: {this.props.shortUrl} </p>
          <p>visitedCount: {this.props.visitedCount} </p>
          <p>LastVisited: {this.props.lastVisited} </p>
          <button ref="copy" data-clipboard-text={this.props.shortUrl}>{this.state.justCopied ? "Copied" : "Copy"}</button>
          <button onClick={()=>{
              Meteor.call("links.setVisibility", this.props._id, !this.props.visible);
          }}>
              {this.props.visible ? "Hide" : "Unhide"}
          </button>
      </div>
    );
  }
};

LinksListItem.propTypes={
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisited: React.PropTypes.number
};
