import { Router } from "express";
import FormulaireController from "../controller/Formulaire";

const router = Router();

router.post("/registerUser", FormulaireController.registerUser);

router.get("/", FormulaireController.getUser);
router.post("/:id", FormulaireController.createUser);
router.get("/:id", FormulaireController.getUsersByProjectId);
router.get("/taskByUser/:userId", FormulaireController.getUserTaskCount);
router.patch("/", FormulaireController.updateUser);

router.put("/:id", FormulaireController.deleteUser);

export default router;
