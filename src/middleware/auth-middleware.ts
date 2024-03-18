import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

export function verifyToken(req: any, res: Response, next: NextFunction) {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
