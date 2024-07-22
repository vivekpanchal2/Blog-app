const JWT = require("jsonwebtoken");

const jwt_secret_key = "bala$122";

function createTokenForUser(user) {
  const payload = {
    userName: user.userName,
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };

  const token = JWT.sign(payload, jwt_secret_key);

  return token;
}

function validateUser(token) {
  return JWT.verify(token, jwt_secret_key);
}

module.exports = {
  createTokenForUser,
  validateUser,
};
