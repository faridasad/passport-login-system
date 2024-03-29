import User from "../models/User.js";
import bcrypt from "bcryptjs";
import createError from "../error.js";
import jwt from "jsonwebtoken";

export const home_get = (req, res) => {
  if (req.cookies.access_token == undefined) res.redirect("/login");

  const token = req.cookies.access_token;

  try {
    const decoded = jwt.verify(token, "2030");
    res.render("home", {
      username: decoded.user.name,
      email: decoded.user.email,
    });
  } catch (err) {
    res.send("Authentication failed").redirect("/login");
  }
};

export const login_get = (req, res) => {
  res.render("login");
};

export const login_post = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Invalid user credentials!"));

    const token = jwt.sign({ user }, "2030");
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200);

    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

export const register_get = (req, res) => {
  res.render("register");
};
export const register_post = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    console.log("User created successfully!");
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

export const logout_get = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
};
