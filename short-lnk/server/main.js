import { Meteor } from 'meteor/meteor';
import { WebApp } from "meteor/webapp";

import '../imports/api/users';
import {Links} from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

  //Middleware to redirect if the Links is a short link
  WebApp.connectHandlers.use((req, res, next)=>{
    //Get URL from Request
    const _id = req.url.slice(1);

    //Check if this is a link from the Database
    const link = Links.findOne({ _id });

    if(link){

      // Set HHTP Status Code
      res.statusCode = 302;

      // Set HHTP Headers
      res.setHeader('location',link.url);

      // Set HTTP Body
      res.write("<p>...redirecting...</p>");

      // End HTTP Request
      res.end();
      Meteor.call("links.trackVisit",_id);

    }else{
      next();
    }

  });

});
