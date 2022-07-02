const router = require('express').Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');
const { isCurrentDate, isBetween7Days } = require('../utils/helper');

const prisma = new PrismaClient();

// get session
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const { user } = req.session.passport;
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Update user name
router.put('/me', authenticate, async (req, res, next) => {
  try {
    const { user } = req.session.passport;
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: { user_name: req.body.user_name },
    });
    user.user_name = updatedUser.user_name;
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// get all users
router.get('/', authenticate, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    const activeToday = users.filter((u) => isCurrentDate(u.updated_at));
    const between7Days = users.filter((u) => isBetween7Days(u.updated_at));

    const response = {
      users,
      total_active_today: activeToday.length,
      total_active_7_days: between7Days.length,
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
});

// get single user
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/new', async (req, res) => {
  console.log('signup reqbody: ', req.body);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log('hashedpass: ', hashedPassword);
    const users = await prisma.user.create({
      data: {
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    console.log('userzz created: ', users);
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});

// Get statistics
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
