const router = require('express').Router();
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/login/success', async (req, res) => {
  console.log('requserzzzzz: ', req.user);
  if (req.user) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });

    const updateUser = await prisma.user.update({
      where: {
        email: req.user.email,
      },
      data: {
        counter: user.counter + 1,
      },
    });

    res.status(200).json({
      success: true,
      message: 'success',
      user: updateUser,
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

router.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/auth/login/failed' }),
  (req, res) => {
    // res.redirect('/auth/login/success');
    res.json(req.user);
  },
);

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
