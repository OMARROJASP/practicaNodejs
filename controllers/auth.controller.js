import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'

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

         const token = jwt.sign({uid:user.id}, process.env.JWT_SECRET);
         return res.json({token})
    }catch(error){
        return res.status(500).json({error: "Error en el servidor"});
    }

}