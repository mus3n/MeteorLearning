import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {onAuthChange, routes} from './../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';


//Check if the User is Authenticated at all times
Tracker.autorun( ()=>{
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
} );


Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('App'));
});
