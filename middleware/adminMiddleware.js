adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .send("Access Denied! You don't have permission to access this route.");
  }
  next();
};

module.exports = adminMiddleware;
