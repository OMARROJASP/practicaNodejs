import {Router} from "express";
import {redirectLink} from "../controllers/redirect.controller.js";

const router = Router();

router.get('/nanoLink',redirectLink)// hace la busqueda en la base de datos
export default router;