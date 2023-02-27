import 'dotenv/config'
import "./database/connectdb.js"
import express from 'express';
import authRouter from './routers/auth.route.js';
import cookieParser from 'cookie-parser';
import linkRouter from "./routers/link.route.js"
import redirectRoute from "./routers/redirect.route.js";
import cors from 'cors'
const whileList = [process.env.ORIGIN1, process.env.ORIGIN2  ]

const app = express();

app.use(cors({
    origin: function (origin, callback){
    if(whileList.includes(origin)){
        return callback(null, origin);
    }
    return callback(
        "Error de CORS origin: " + origin + " No autorizado!"
    )
    },
    credentials: true,
}
))
app.use(express.json());
app.use(cookieParser())
app.use('/', redirectRoute)
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/links", linkRouter)
//solo para ejemplo
//app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("hay caray 😂😂😂😂por fin http://localhost:" +PORT))
