import { Request, Response } from "express";
import { League } from "../models/league";
import { User } from "../models/user";
import { UserLeagues } from "../models/users_leagues";
import jwt from "jsonwebtoken";

export const createLeague = async (req: Request, res: Response) => {
  const { name } = req.body;

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

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the name already exists
    const existingName = await League.findOne({
      where: { name },
    });

    if (existingName) {
      return res.status(400).json({
        msg: "Name already taken",
      });
    }

    const league = await League.create({ name: name });

    await UserLeagues.create({
      UserId: user.id,
      LeagueId: league.id,
    });

    res.status(201).json({
      msg: "League created",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const getUserLeagues = async (req: Request, res: Response) => {
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

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const leagues = await user.getLeagues();

    return res.status(200).json(leagues);
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const addUserToLeague = async (req: Request, res: Response) => {
  const { leagueId } = req.body;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    const league = await League.findByPk(leagueId);

    if (!user || !league) {
      return res.status(404).json({ message: "User or League not found" });
    }

    await user.addLeague(league);

    res.status(201).json({ msg: "User added to league" });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};

export const removeUserFromLeague = async (req: Request, res: Response) => {
  const { leagueId } = req.body;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    const league = await League.findByPk(leagueId);

    if (!user || !league) {
      return res.status(404).json({ message: "User or League not found" });
    }

    await user.removeLeague(league);

    res.status(200).json({ msg: "User removed from league" });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
      error: error,
    });
  }
};
