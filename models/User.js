//import {Schema, model} from 'mongoose' nos va a asalir error
import mongoose from "mongoose"
import bcryptjs from    "bcryptjs"
//metodos que impone mongodb
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true, //limpiar los espacios vacios
        unique:true, //unicos lee el email en la base de datos
        lowercase: true, //mayuscula
        index: {indique: true}, // busqueda mas rapida para enorme proyectos
    },

    password: {
        type: String,
        required: true
    }

})

userSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified('password')) return next();
    try{
        
        const salt = await bcryptjs.genSalt(10)//para hacer los saltos
        user.password = await bcryptjs.hash(user.password,salt)//para encriptar la contraseña
        next()
    }catch(error){
        console.log(error)
        throw new Error('Fallo el hash de contraseña') 
    }
})

userSchema.methods.comparePassword = async function (canditatePassword){
    return await bcryptjs.compare(canditatePassword, this.password);
}


export const User = mongoose.model('User', userSchema)  //el modelo nos da la posibilidad de accesder a todos los metodos para guardar al usuario  