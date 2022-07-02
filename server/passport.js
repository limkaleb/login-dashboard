const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = (passport) => {
  const authenticateUser = async (email, password, done) => {
    console.log('authenticateee: ', email, password);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log('userrres: ', user);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('inside comparee');
        return done(null, user);
      }
      return done(null, false, { message: 'Password Incorrect' });
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        email: profile.emails[0].value,
        user_name: profile.displayName,
        verified: true,
      };
      try {
        let user = await prisma.user.findUnique({
          where: {
            email: profile.emails[0].value,
          },
        });

        if (user) {
          done(null, user);
        } else {
          user = await prisma.user.create({
            data: newUser,
          });
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    },
  ));

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('profile facebook: ', profile);
        done(null, profile);
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
