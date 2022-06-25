const router = require('express').Router();
const passport = require('passport');

router.get('/login/success', (req, res) => {
  console.log('zzz reqq: ', req.session);
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'success',
      user: req.user,
      cookies: req.session,
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'failed',
    });
  }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failed',
  });
});

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3002',
  failureRedirect: '/login/failed',
}));

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'profile'] }));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: 'http://localhost:3002',
  failureRedirect: '/login/failed',
}));

router.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.redirect('http://localhost:3002');
});

module.exports = router;
