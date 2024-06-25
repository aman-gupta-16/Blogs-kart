const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { createToken } = require("../services/auth");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: "/public/images/default.png",
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    const salt = (await bcrypt.genSalt(10)).toString();
    const hash = await bcrypt.hash(user.password, salt);
    this.password = hash;
    this.salt = salt;
  } catch (err) {
    return next(err);
  }
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("user not found");
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (isPasswordMatch) {
    const token = createToken(user);
    return token;
  } else throw new Error("password mismatch");
});

const User = model("user", userSchema);
module.exports = User;
