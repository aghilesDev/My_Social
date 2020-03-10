var passport = require('passport');// This is how you initialize the local strategy module
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({
        username: username
    }, function(err, user) {
        // This is how you handle error
        if (err) return done(err);        // When user is not found
        if (!user) return done(null, false);        // When password is not correct
        if (!user.authenticate(password)) return done(null, false);        // When all things are good, we return the user
        return done(null, user);
     });
}));

const ensureAuthenticated = (req, res, next) => req.isAuthenticated()? next(): res.send(401);
module.exports=ensureAuthenticated;