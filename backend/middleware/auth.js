import User from "../models/user.js";

const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({ accessToken: req.header("Authorization") });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
};

export default authenticateUser;
