'use strict';

var Homework = require('../../models/homework');
var Joi = require('joi');

exports.register = function(server, options, next){
 server.route({
  method: 'PUT',
  path: '/homeworks/{homeworkId}',
  config: {
   description: 'Update a homework item',
   validate: {
    params: {
     homeworkId: Joi.string().length(24)
    }
   },
   handler: function(request, reply){
    Homework.findOne({_id: request.params.homeworkId, userId: request.auth.credentials._id}, function(err, homework){
     if(!homework){return reply().code(400);}
     else if (homework.isPicked !== request.payload.isPicked){
      homework.isPicked = request.payload.isPicked;
     } else {
      homework.name = request.payload.name;
      homework.description = request.payload.description;
      homework.category = request.payload.category;
      homework.dueDate = request.payload.dueDate;
      homework.isPicked = request.payload.isPicked;
     }
     homework.save(function(){
      return reply(homework);
     });
    });
   }
  }
 });

 return next();
};

exports.register.attributes = {
 name: 'homeworks.update'
};
