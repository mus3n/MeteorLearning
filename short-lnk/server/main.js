import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';



Meteor.startup(() => {

  Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;

    try{
      new SimpleSchema({
        email:{
          type: String,
          regEx: SimpleSchema.RegEx.Email
        }
      }).validate({email});
    } catch(e){
      throw new Meteor.Error(400,e.message);
    }

    return true;

  });



  /*
  // code to run on server at startup

  const employeeSchema = new SimpleSchema({
    name: {
      type: String,
      min: 1,
      max: 200,
    },

    hourlyWage:{
      type: Number,
      min: 0
    },

    email:{
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email
    }
  });

  employeeSchema.validate({
    name: 'Chris',
    hourlyWage: 5,
    email: 'mus3n@gmx.de'
  });
*/
});
