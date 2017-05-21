import React from "react";
import {Session} from "meteor/session";
import {Tarcker} from "meteor/tracker";

export default class LinksListFilters extends React.Component{

  constructor(props){
    super(props);
    this.state={
      showVisible: true
    };
  }

  componentDidMount(){
    this.linksTracker = Tracker.autorun( ()=>{
      const showVisible = Session.get("showVisible");
      this.setState({showVisible: showVisible});
    } );
  }

  componentWillUnmount(){
    this.linksTracker.stop();
  }

  onChange(e){
    this.setState(
      {
        showVisible: !e.target.checked
      }
    );
    Session.set("showVisible", !e.target.checked);
  }

  render(){
    return (
      <div>
          <label className="checkbox">
            <input
              className="checkbox__box"
              type="checkbox"
              checked={!this.state.showVisible}
              onChange={this.onChange.bind(this)}
            />
            show hidden links
          </label>
      </div>
    )
  };
}
