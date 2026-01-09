const express = require('express');
const passport = require('passport');
const { facebookLoginCallback } = require('../Controller/FacebookLogin');
const router = express.Router();

/**
 * Facebook OAuth Routes
 * 
 * GET /api/auth/facebook - Initiates Facebook OAuth flow
 * GET /api/auth/facebook/callback - Handles Facebook OAuth callback
 * GET /api/auth/facebook/error - Error handler for failed authentication
 */

// Initiate Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] ,session:false}));

// Facebook OAuth callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { 
    session: false, 
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=facebook_auth_failed` 
  }),
  facebookLoginCallback
);

// Error handler route
router.get('/facebook/error', (req, res) => {
  res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=facebook_auth_failed`);
});

module.exports = router;

