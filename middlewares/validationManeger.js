import { validationResult, body, param } from "express-validator"
import axios from "axios"

export const validationResultExpress = (req, res,next) => {
    const errors= validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    next()
}

export const paramLinkValidator = [
    param("id","Formato no valido(expressvALIDATOR)")
    .trim()
    .notEmpty()
    .escape()
    ,validationResultExpress
]


export  const bodyLinkValidator = [
    body("longLink", "formato Link incorrecto")
    .trim()
    .notEmpty()
    .custom(async (value) => {
        try {
            
            if(!value.startsWith("https://")){
                value = "https://" + value
            }
              

           
            await axios.get(value);
            return value;
        } catch (error) {
            console.log(error)
            throw new Error("not found longlink 404")
        }
    }),validationResultExpress
]



export const bodyRegisterValidator = [
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
    }),
    validationResultExpress
];

export const bodyLoginValidator = [
    body('email',"Formato de email Incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password","minimo 6 caracteres")
        .trim()
        .isLength({min:6}),

    validationResultExpress
];