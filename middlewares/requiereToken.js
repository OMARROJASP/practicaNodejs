import jwt from "jsonwebtoken"

export const requiereToken = (req, res, next)=>{
    try {
        let token = req.headers?.authorization;
        if (!token)  throw new Error('No Bearer') // salta al chatch y no toca el next
        
      // como el token esta en formato bearer devemos trasforamrlo
      token = token.split(" ")[1]// lo transforma en vectores  ya el authorization esta en Bearer token 

        const {id} =  jwt.verify(token, process.env.JWT_SECRET)

        //cualquiera q tenga acceso a este middlewares tendra el acceso al req
        req.id = id
        
        next()        
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: error.message})
    }
}