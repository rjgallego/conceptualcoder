const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/Users');

passport.serializeUser((user, done) => {
    console.log('Serialized user');

    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    console.log("Deserializing user...");
    Users.findById(id, (err, user) => {
            console.log("Deserialized user ");

            done(null, user);
        }
    )
})

passport.use( new LocalStrategy(
    {
        usernameField: 'user[email]',
        passwordField: 'user[password]'
    },
    function(email, password, done){
        Users.findOne({email: email}, (err, user) => {
            if(err) {
                done(err);
            }
            if(!user) {
                return done(null, false, { message: "Incorrect email"})
            }
            if(!user.validatePassword(password)){
                return done(null, false, { message: "Invalid password" });
            }
            return done(null, user);
        })
    }
));

module.exports = passport;