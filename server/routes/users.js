const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const { authenticate } = require('../middleware/auth');

const prisma = new PrismaClient();

// get all
router.get('/', authenticate, async (req, res, next) => {
  try {
    // console.log('requserrr: ', req.user);
    // console.log('reqq: ', req.session);
    const users = await prisma.user.findMany({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// get single
router.get('/:id', async (req, res, next) => {
  try {
    // console.log('req.params: ', req.params);
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/new', async (req, res) => {
  try {
    const users = await prisma.user.create({
      data: req.body,
    });
    console.log('userss: ', users);
    res.json(users);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
