const User = require('../models/userModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const findEmail = await User.findOne({ email });
  if (findEmail) {
    res.status(400).json({ msg: "user Already exists" });
  }
  const encryptText = bcrypt.hashSync(password);
  const user = new User({
    name: name,
    email: email,
    password: encryptText,
  });
  await user.save();
  res.json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) throw new Error("invalid email or password");
  const validPassword = bcrypt.compareSync(password, findUser.password);
  if (!validPassword) throw new Error("invalid credentials");
  const userToken = jwt.sign({ id: findUser._id }, process.env.USER_KEY, {
    expiresIn: "1d",
  });
  res.cookie(String(findUser._id), userToken, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ msg: "success", userToken });
};

const logOut = async (req, res) => {
  const { id } = req.user;
  const findUser = await User.findById(id, "-password");
  if (!findUser) throw new Error("user not found");
  res.clearCookie(`${findUser.id}`);
  req.cookies[`${findUser.id}`] = "";
  res.json({ msg: "user loggedout" });
};

const getUser = async (req, res) => {
  const { id } = req.user;
  const getaUser = await User.findById(id, "-password");
  if (!getaUser) throw new Error("User not found");
  res.json({ msg: "success", getaUser });
};

module.exports = { createUser, loginUser, logOut, getUser };