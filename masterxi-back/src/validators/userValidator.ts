import { body } from "express-validator";

const createValidator = (
  field: string | string[] | undefined,
  validations: any[]
) => {
  return validations.reduce(
    (validator, validation) =>
      validator[validation.method](...validation.args).withMessage(
        validation.message
      ),
    body(field)
  );
};

export const emailValidator = (field = "email") =>
  createValidator(field, [
    { method: "notEmpty", args: [], message: "Email is required" },
    { method: "isEmail", args: [], message: "Must be a valid email address" },
  ]);

export const usernameValidator = (
  field = "username",
  minLength = 5,
  maxLength = 20
) =>
  createValidator(field, [
    { method: "notEmpty", args: [], message: "Username is required" },
    {
      method: "isLength",
      args: [{ min: minLength, max: maxLength }],
      message: `Username must be between ${minLength} and ${maxLength} characters long`,
    },
    {
      method: "matches",
      args: [/^[a-zA-Z0-9_]+$/],
      message: "Username must be alphanumeric and can include underscores",
    },
  ]);

export const passwordValidator = (
  field = "password",
  minLength = 8,
  maxLength = 20
) =>
  createValidator(field, [
    { method: "notEmpty", args: [], message: "Password is required" },
    {
      method: "isLength",
      args: [{ min: minLength, max: maxLength }],
      message: `Password must be between ${minLength} and ${maxLength} characters long`,
    },
    {
      method: "matches",
      args: [/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/],
      message:
        "Password must include at least one uppercase letter, one lowercase letter, and one digit",
    },
  ]);

export const confirmPasswordValidator = (field = "newPasswordConfirm") =>
  createValidator(field, [
    {
      method: "notEmpty",
      args: [],
      message: "New password confirmation is required",
    },
  ]);

export const emailRegisterValidator = emailValidator();
export const usernameRegisterValidator = usernameValidator();
export const passwordRegisterValidator = passwordValidator();

export const usernameLoginValidator = usernameValidator("username", 1, 50);
export const passwordLoginValidator = passwordValidator("password", 1, 50);

export const emailConfigValidator = emailValidator();
export const usernameConfigValidator = usernameValidator();
export const currentPasswordConfigValidator = passwordValidator(
  "currentPassword",
  1,
  50
);
export const newPasswordConfigValidator = passwordValidator("newPassword");
export const newPasswordConfirmConfigValidator = confirmPasswordValidator();
