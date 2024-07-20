const mongoose = require("mongoose");
const {} = require("");
const { createHmac } = require("node:crypto");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    salt: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "/image/default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = this.password;
});

const User = mongoose.model("users", userSchema);

export default User;
