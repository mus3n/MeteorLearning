import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {Tracker} from 'meteor/tracker';

//imports
import Signup from "./../ui/Signup.js";
import Link from "./../ui/Link.js";
import NotFound from "./../ui/NotFound.js";
import Login from "./../ui/Login.js";

const unauthenticatedPages=['/', 'signup'];
const authenticatedPages=['/links'];

//Kick logged in Users to App
const onEnterPublicPage = () => {
  if(!!Meteor.userId()){
    browserHistory.replace('/links');
  }
}

//Kick logged out Users to the Login Screen
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
}

export const routes=(
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/Links" component={Link} onEnter={onEnterPrivatePage}/>
    <Route path="*" component={NotFound} onEnter={onEnterPrivatePage}/>
  </Router>
);

export const onAuthChange=(isAuthenticated)=>{
  const pathName = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if(isUnauthenticatedPage && isAuthenticated){
    //Redirect to App  /links
    browserHistory.replace("/links");
  } else if (isAuthenticatedPage && !isAuthenticated){
    //Redirect to Login /
    browserHistory.replace("/");
  }
};
