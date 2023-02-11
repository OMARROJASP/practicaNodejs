import {Router} from "express"
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validationManeger.js";
const router = Router()

// GET              /api/v1/links           all links
// GET              /api/v1/links/:id       single link
// POST             /api/v1/links           create link
// PATCH/PUT        /api/v1/links/:id       update link
// DELETE           /api/v1/links/:id       remove link

router.get('/',requiereToken,getLinks )
router.get("/:id",requiereToken,  getLink)
router.post('/',requiereToken,bodyLinkValidator,createLink)
router.delete("/:id", requiereToken,paramLinkValidator, removeLink)


export default router;