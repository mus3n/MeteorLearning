import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';
export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error: 0
    };
  }
  increment(){
    this.setState({
      count: this.state.count +1
    });
  }
  onSubmit(e){
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err)=>{
      if(err){
        this.setState({error: "Unable to Login, check E-Mail & Password"});
      }else{
        this.setState({error: ""});
      }
    });

  }

  render(){
      return (
        <div>
          <h1>Short link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="E-Mail" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button>Login</button>
          </form>


            <p><Link to="/signup">Need an Account? Signup here!</Link></p>
        </div>


      );
  }
}
