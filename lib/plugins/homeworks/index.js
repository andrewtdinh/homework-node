'use strict';

var Homework = require('../../models/homework');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/homeworks',
    config: {
      description: 'Get all the homeworks by User',
      handler: function(request, reply){
        Homework.find({userId: request.auth.credentials._id}, function(err, homeworks){
          return reply({homeworks: homeworks});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'homeworks.index'
};
