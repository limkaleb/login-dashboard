module.exports = {
  authenticate: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('http://localhost:3002');
  },
};
