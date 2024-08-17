import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const newUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    // Check if the email already exists
    const existingUserByEmail = await User.findOne({ where: { email: email } });
    if (existingUserByEmail) {
      return res.status(409).json({
        msg: `User already exists with email ${email}`,
      });
    }

    // Check if the username already exists
    const existingUserByUsername = await User.findOne({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return res.status(409).json({
        msg: `User already exists with username ${username}`,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: `User ${username} created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "An error occurred while creating the user",
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({
        msg: `User not found with username ${username}`,
      });
    }

    // Validate password
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({
        msg: `Incorrect password`,
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const changeUsername = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }

    // Decrypt the token and get the user id
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.id;

    // Check if the new username already exists
    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "Username already taken",
      });
    }

    // Update the username in the database
    await User.update({ username }, { where: { id: userId } });

    // Responds successfully
    res.status(200).json({
      msg: "Username updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const changeEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }

    // Decrypt the token and get the user id
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.id;

    // Check if the new email already exists
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "Email already taken",
      });
    }

    // Update the email in the database
    await User.update({ email }, { where: { id: userId } });

    // Responds successfully
    res.status(200).json({
      msg: "Email updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (newPassword !== newPasswordConfirm) {
    return res.status(400).json({
      msg: "New passwords do not match",
    });
  }

  try {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }

    // Decrypt the token and get the user id
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.id;

    // Search the user in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Current password is incorrect",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the new password
    await User.update({ password: hashedPassword }, { where: { id: userId } });

    // Responds successfully
    res.status(200).json({
      msg: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
      });
    }

    // Decrypt the token and get the user id
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.id;

    // Search the user in the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    // Delete user
    await user.destroy();

    // Responds successfully
    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};
