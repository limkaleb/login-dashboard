const router = require('express').Router();
const { authenticate } = require('../middleware/auth');
// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// get all
router.get('/', async (req, res) => {
  res.send('LANDING');
});

router.get('/dashboard', authenticate, (req, res) => {
  res.send('DASHBOARD');
});

module.exports = router;
