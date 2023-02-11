import express from "express";
import { infoUser, login, logout, refreshToken, register } from "../controllers/auth.controller.js";
import {body} from "express-validator"
import { requiereToken } from "../middlewares/requiereToken.js";
import { requiereRefreshToken } from "../middlewares/requiereRefreshToken.js";
import { bodyRegisterValidator, bodyLoginValidator } from "../middlewares/validationManeger.js";


const router = express.Router();

router.post("/register",bodyRegisterValidator,register)

router.post("/login",bodyLoginValidator,login)

router.get("/register",register);

router.get("/login",login);

router.get("/protected",requiereToken,infoUser);

router.get("/refresh",requiereRefreshToken,refreshToken);

router.get("/logout",logout);
export default router;