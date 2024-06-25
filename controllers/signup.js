const User = require("../models/user");

const handleGetSignup = (req, res) => {
  res.render("signup");
};

const hadlePostSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({ fullName: fullName, email: email, password: password });
  res.redirect("/user/login");
};

module.exports = {
  handleGetSignup,
  hadlePostSignup,
};
