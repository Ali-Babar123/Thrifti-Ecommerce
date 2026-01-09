const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../Models/User');
const dotenv = require('dotenv');

dotenv.config();
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || '/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile);
        // Find or create user
        let user = await User.findOne({ 
          $or: [
            { email: profile.emails?.[0]?.value },
            { facebookId: profile.id }
          ]
        });

        if (user) {
          // Update Facebook ID if not set
          if (!user.facebookId) {
            user.facebookId = profile.id;
            await user.save();
          }
          // Update profile image if not set
          if (!user.profileImage && profile.photos?.[0]?.value) {
            user.profileImage = profile.photos[0].value;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user
        const newUser = await User.create({
          facebookId: profile.id,
          email: profile.emails?.[0]?.value || `facebook_${profile.id}@facebook.com`,
          fullName: profile.displayName || 'Facebook User',
          username: profile.displayName?.replace(/\s+/g, '').toLowerCase() || `user${Date.now()}`,
          profileImage: profile.photos?.[0]?.value || '',
          isVerified: true
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);


module.exports = passport;


