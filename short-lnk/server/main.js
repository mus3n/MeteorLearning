import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';



Meteor.startup(() => {
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

});
