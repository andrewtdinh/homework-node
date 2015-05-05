'use strict';

var Homework = require('../../models/homework');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'POST',
    path: '/homeworks',
    config: {
      description: 'Create a homework item',
      validate: {
        payload: {
          name: Joi.string().required().min(3),
          description: Joi.string(),
          dueDate: Joi.date().iso().required(),
          category: Joi.string().required().min(3)
        }
      },
      handler: function(request, reply){
        var homework = new Homework(request.payload);
        homework.userId = request.auth.credentials._id;
        homework.save(function(){
          return reply(homework);
        });
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'homeworks.create'
};
