const express = require('express');
const cors = require('cors');
const passport = require('passport');
// const session = require('express-session');
const cookieSession = require('cookie-session');
require('dotenv').config();
// const { auth, requiresAuth } = require('express-openid-connect');
// const MemoryStore = require('memorystore')(auth);
// const pool = require('./db');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

require('./passport')(passport);

app.use(
  cookieSession({
    name: 'session',
    keys: ['kaleb'],
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 100,
  }),
);

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:3002',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// app.use(
//   auth({
//     authorizationParams: {
//       response_type: 'code',
//       scope: 'openid profile email',
//     },
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     // clientSecret: process.env.SECRET,
//     secret: process.env.SECRET,
//     idpLogout: true,
//     routes: {
//       login: false,
//     },
//     // session: {
//     //   store: new MemoryStore({
//     //     checkPeriod: 60 * 1000,
//     //   }),
//     // },
//   }),
// );

app.use('/', require('./routes/index'));

app.use('/users', userRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
