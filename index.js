import 'dotenv/config'
import "./database/connectdb.js"
import express from 'express';
import authRouter from './routers/auth.route.js';
import cookieParser from 'cookie-parser';
import linkRouter from "./routers/link.route.js"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.use("/api/v1/links", linkRouter)
//solo para ejemplo
app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log("hay caray 😂😂😂😂por fin http://localhost:" +PORT))
