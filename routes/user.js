const { Router } = require("express");
const { hadlePostSignup, handleGetSignup } = require("../controllers/signup");
const {
  handleGetLogin,
  handlePostLogin,
  handleGetLogout,
} = require("../controllers/login");

const router = Router();

router.get("/signup", handleGetSignup);
router.post("/signup", hadlePostSignup);
router.get("/login", handleGetLogin);
router.post("/login", handlePostLogin);
router.get("/logout", handleGetLogout);

module.exports = router;
