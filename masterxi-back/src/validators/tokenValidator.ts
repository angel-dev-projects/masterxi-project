import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    res
      .status(500)
      .json({ msg: "Server configuration error: SECRET_KEY is not defined" });
    return;
  }

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.slice(7); // Extract token from "Bearer <token>"

    try {
      jwt.verify(token, secretKey);
      next();
    } catch (error) {
      res.status(401).json({ msg: "Invalid token" });
    }
  } else {
    res.status(401).json({ msg: "Access denied: No token provided" });
  }
};

export default validateToken;
