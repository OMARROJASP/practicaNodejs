import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';


export const register = async(req, res)=>{
    const {email, password} = req.body;
        console.log(req.body);
    try{      
        let user = await User.findOne({email})
        if(!user){
            user = new User({email, password})
            await user.save();
        }
        return res.state(200).json({ok: 'se ha registro correctamente'})
    }catch(error){
        if(error.code === 11000){
            return res.status(404).json({error: "Ya existe el usuario"})
        }
    }

    return res.status(200).json({ok: 'se ha registro correctamente ❤️❤️❤️'})
}

export const login = async(req, res)=> {


    
    try{
        const {email, password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            return res.state(403).json({error: 'No existe el usuario registrado'})
        }

         const respuestaPassword = await user.comparePassword(password);
         if(!respuestaPassword)
         return res.status(403).json({error: "Contraseña incorrecta"})



         // generar el token  JWT
           
         const {token, expiresIn} = generateToken(user.id)
         generateRefreshToken(user.id, res)
        
         /*
         para usar el cookie
         res.cookie("token", token, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer")
         })
*/
            
       //  const token = jwt.sign({uid:user.id}, process.env.JWT_SECRET);
         return res.json({token, expiresIn})//devolver el token y la expiracion
    }catch(error){
        return res.status(500).json({error: "Error en el servidor"});
    }

}


export const  infoUser = async(req, res)=> {

   
    try {
        const user = await User.findById(req.uid).lean()
        return res.json({email: user.email, uid: user._id})
    } catch (error) {
        return res.status(500).json({error: "error de server"})
    }

   
}

export const refreshToken = (req, res) => {
  
    try {
        const  refreshTokenCookie = req.cookies?.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el refreshToken");

        const {uid} =  jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        const {token, expiresIn} = generateToken(uid)
        return res.json({token, expiresIn})
    
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
    
}


export const logout = (req, res) => {
     res.clearCookie('refreshToken')
     res.json({ok: "true"})
}