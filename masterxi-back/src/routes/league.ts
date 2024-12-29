import { createLeague, getUserLeagues, addUserToLeague, removeUserFromLeague } from "./../controllers/league";
import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import validateToken from "../validators/tokenValidator";

const router = Router();

router.get("/", validateRequest, validateToken, getUserLeagues);
router.post("/create", validateRequest, validateToken, createLeague);
router.post("/add-user", validateRequest, validateToken, addUserToLeague);
router.delete("/remove-user", validateRequest, validateToken, removeUserFromLeague);

export default router;
