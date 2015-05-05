'use strict';

var Homework = require('../../models/homework');
var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'DELETE',
  path: '/homeworks/{homeworkId}',
  config: {
   description: 'Delete a homework item',
   validate: {
    params: {
     homeworkId: Joi.string().length(24)
    }
   },
   handler: function(request, reply){
    Homework.findOne({_id: request.params.homeworkId, userId: request.auth.credentials._id}, function(err, homework){
     if(!homework){return reply().code(400);}

     homework.remove(function(){
      return reply(homework);
     });
    });
   }
  }
 });
 return next();
};

exports.register.attributes = {
  name: 'homeworks.destroy'
};
