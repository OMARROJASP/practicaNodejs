import mongoose from "mongoose";


try{
    await mongoose.connect(process.env.URI_MONGO)
    console.log("conexion segura ❤️❤️❤️❤️")
}catch(error){
    console.log("no se pudo conectar: "+ error)
}