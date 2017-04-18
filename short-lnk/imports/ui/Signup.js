import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component{
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
    let password = this.refs.email.value.trim();

    Accounts.createUser({email, password}, (err)=>{
      if(err){
        this.setState({error: err.reason});
      }else{
        this.setState({error: ""});
      }
    });

  }

  render(){
      return (
        <div>
            <h1>Signup to short link</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)}>
              <input type="email" ref="email" name="email" placeholder="E-Mail" />
              <input type="password" ref="password" name="password" placeholder="Password" />
              <button>Login</button>
            </form>


            <p><Link to="/">Allready hav an Account? Login here!</Link></p>
        </div>


      );
  }
}
