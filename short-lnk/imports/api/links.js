import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import shortid from "shortid";

import SimpleSchema from 'simpl-schema';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish("linksPublication", function () {
      return Links.find( { userId: this.userId } );
    });
}

Meteor.methods({
    'links.insert'(url){
      if(!this.userId){
        throw new Meteor.Error("not authorized","UserId is undefined, you are not logged in.");
      }

      new SimpleSchema({
        url:{
          type: String,
          label: "Your Link",
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({url});

      Links.insert(
        {
          _id: shortid.generate(),
          url,
          userId: this.userId,
          visible: true

        }
      );
    },
    "links.setVisibility"(_id,visible){
      if(!this.userId){
        throw new Meteor.Error("not authorized","UserId is undefined, you are not logged in.");
      }

      new SimpleSchema({
        _id:{
          type: String,
          min: 1
        }
      }).validate({_id});

      new SimpleSchema({
        visible:{
          type: Boolean,
          min: 1
        }
      }).validate({visible});

      //Updating the _id Link
      Links.update(
        {
          _id: _id,
          userId: this.userId
        },
        {
          $set: {visible: visible}
        }
      );
    }
});
