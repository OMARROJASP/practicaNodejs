import jwt from "jsonwebtoken"
import { TokenVerificationErrors } from "../utils/tokenManager.js";
export const requiereToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;

        if (!token) throw new Error("No Bearer no pudimos terminar");

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        //console.log(uid)
        next();
    } catch (error) {
        console.log(error)
       
        return res.status(401).json({error: TokenVerificationErrors[error.message]})
    }
};

/*

export const requiereToken = (req, res, next) => {
    try {
        let token = req.cookies?.token;
        if(!token) throw new Error("No existe el token en el headers");
      

        //token =token.split(" ")[1];
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
      

        req.uid = uid
        next()
    } catch (error) {
        console.log(error)
        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no válido"
        };
        return res.status(401).json({error: TokenVerificationErrors[error.message]})
    }
};


*/