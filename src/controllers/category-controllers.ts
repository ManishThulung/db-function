import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await pool.query("select get_categories()");
    const result = categories?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await pool.query(
      `select get_category_by_id(${req.params.id})`
    );

    const result = category?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, parent_id } = req.body;

    const course = await pool.query(
      `select create_or_update_category($1, $2, $3)`,
      [id, name, parent_id]
    );

    const result = course?.rows[0];

    res.status(200).json({ result: result });
  } catch (error) {
    next(error);
  }
};
