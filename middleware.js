exports.requireLogin = (req, res, next) => {
  if (req.session && res.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
