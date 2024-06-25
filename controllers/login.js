const User = require("../models/user");

const handleGetLogin = (req, res) => {
  res.render("login");
};

const handlePostLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPassword(email, password);
    res.cookie("token", token).redirect("/");
  } catch (err) {
    res.render("login", {
      error: "incorrect password or email",
    });
  }
};

const handleGetLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = {
  handleGetLogin,
  handlePostLogin,
  handleGetLogout,
};
