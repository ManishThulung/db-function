import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await pool.query("select get_users()");
    const result = users?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await pool.query(`select get_user_by_iddd(${req.params.id})`);
    // const result = user;

    // if (!result["get_user_by_id"]) {
    //   res.status(404).json({ message: "Not Found!" });
    // }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, products } = req.body;

    // if (!data) {
    //   res.status(404).json({
    //     success: false,
    //     message: "Not found!",
    //   });
    // }

    const productArray = JSON.stringify(products);

    const course = await pool.query(
      `select create_or_update_user($1, $2, $3)`,
      [id, name, productArray]
    );

    const result = course?.rows[0];

    res.status(200).json({ result: result });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await pool.query(`select delete_user(${req.params.id})`);
    const result = user?.rows[0];
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};