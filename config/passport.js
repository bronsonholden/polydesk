const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const  bcrypt = require('bcryptjs');

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((id, callback) => {
  User.findOne({
    id: id
  }, (err, user) => {
    callback(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, callback) => {
  User.findOne({
    email: email
  }, (err, user) => {
    if (err) {
      return callback(err);
    }

    if (!user) {
      return callback(null, false, {
        message: 'Incorrect email address or password'
      });
    }

    bcrypt.compare(password, user.password, (err, res) => {
      if (!res) {
        return callback(null, false, {
          message: 'Incorrect email address or password'
        });
      }

      callback(null, user.toJSON(), {
        message: 'Login successful'
      });
    });
  });
}));
