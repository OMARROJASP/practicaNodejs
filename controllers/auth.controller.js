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

        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
       

        return res.state(201).json({token, expiresIn})
    }catch(error){
        if(error.code === 11000){
            return res.status(404).json({error: "Ya existe el usuario"})
        }
    }
 
    console.log({email, password})
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
        const {token, expiresIn} = generateToken(req.uid)
        return res.json({token, expiresIn})
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "error de server"})
    }
    
}


export const logout = (req, res) => {
     res.clearCookie('refreshToken')
     res.json({ok: "true"})
}