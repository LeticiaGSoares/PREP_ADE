import {Router } from "express"
import { create, getEmpresa} from "../controllers/empresaController.js";

const router = Router()

router.post('', create);
router.get('', getEmpresa);

export default router;