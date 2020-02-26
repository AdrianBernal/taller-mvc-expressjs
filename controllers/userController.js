// Cargamos los modelos para usarlos posteriormente
var User = require('../model/user');

var mongoose = require('mongoose');
var User = require("../model/User");

var userController = {};

userController.list = function(req, res, next){
    var users = User.list();
    var strUsers = "";
    users.forEach(
        user => strUsers += "<li>" + user.getFullName() + "</li>"
    );


    strUsers = "<ul>" + strUsers + "</ul>";
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var params = {};
    params.title = "Test web page on node.js";
    params.pagetitle = "Hello there";
    params.content = "<p>List of users:</p>" + strUsers;
    res.render('users', params);

};

userController.save = function(req, res, next){
    var user = new User(req.username);
    user.save(
        function (err) {
            if (err) {
                throw err;
            }
            res.writeHead(301,
                {Location: '/users'}
            );
            res.end();
        }
    );
};

/*
 * Other actions
 */

module.exports = userController;