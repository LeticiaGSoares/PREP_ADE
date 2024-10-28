import {Router } from "express"
import { create, getAll, getPublicacao } from "../controllers/publicacaoControllers.js";

const router = Router()

router.post("/", create)
router.get('/', getAll);
router.get('/:id', getPublicacao);

export default router;