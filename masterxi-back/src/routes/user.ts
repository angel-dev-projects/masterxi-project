import { Router } from "express";
import {
  loginUser,
  newUser,
  changeUsername,
  changeEmail,
  changePassword,
  deleteUser,
} from "../controllers/user";
import {
  emailRegisterValidator,
  usernameRegisterValidator,
  passwordRegisterValidator,
  usernameLoginValidator,
  passwordLoginValidator,
  emailConfigValidator,
  usernameConfigValidator,
  currentPasswordConfigValidator,
  newPasswordConfigValidator,
  newPasswordConfirmConfigValidator,
} from "../validators/userValidator";
import { validateRequest } from "../middlewares/validateRequest";
import validateToken from "../validators/tokenValidator";

const router = Router();

router.post(
  "/register",
  [
    emailRegisterValidator,
    usernameRegisterValidator,
    passwordRegisterValidator,
  ],
  validateRequest,
  newUser
);
router.post(
  "/login",
  [usernameLoginValidator, passwordLoginValidator],
  validateRequest,
  loginUser
);
router.put(
  "/change-username",
  [usernameConfigValidator],
  validateRequest,
  validateToken,
  changeUsername
);
router.put(
  "/change-email",
  [emailConfigValidator],
  validateRequest,
  validateToken,
  changeEmail
);
router.put(
  "/change-password",
  [
    currentPasswordConfigValidator,
    newPasswordConfigValidator,
    newPasswordConfirmConfigValidator,
  ],
  validateRequest,
  validateToken,
  changePassword
);
router.delete("/delete", validateToken, deleteUser);

export default router;
