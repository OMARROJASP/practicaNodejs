import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from "express-validator"
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


const router = express.Router();

router.post("/register",[
    body("email", "formato del email Incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password","minimo 6 caracteres")
        .trim()
        .isLength({min:6}),
    body("password","formato de password incorrecta")
        .custom((value,{req})=>{
            if(value != req.body.repassword){
                throw new Error('no coinden las contraseñas')
            }
            return value
        })
],
validationResultExpress,register)

router.post("/login",[
    body('email',"Formato de email Incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password","minimo 6 caracteres")
        .trim()
        .isLength({min:6}),

],validationResultExpress,login)

router.get("/register",register);

router.get("/login",login);

export default router;