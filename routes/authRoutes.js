import express from "express";
import cookieParser from "cookie-parser";
import {
  login_get,
  login_post,
  register_get,
  register_post,
  logout_get,
  home_get
} from "../controllers/authControllers.js";

const router = express.Router();
router.use(express.urlencoded({extended: false}))
router.use(cookieParser())

router.get("/login", login_get);
router.post("/login", login_post);
router.get("/register", register_get);
router.post("/register", register_post);
router.get("/logout", logout_get);
router.get("/home", home_get)

export default router;
