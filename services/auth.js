const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY);
  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  return payload;
};

module.exports = {
  createToken,
  validateToken,
};
