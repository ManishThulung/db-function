import { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import * as path from "path";
import { Parser } from "json2csv";

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
    const user = await pool.query(`select get_user_by_idd(${req.params.id})`);
    const result = user.rows[0];

    // if (!result["get_user_by_id"]) {
    //   res.status(404).json({ message: "Not Found!" });
    // }

    res.status(200).json(result);
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

export const getStores = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await pool.query("select store.get_stores()");
    const result = users?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await pool.query(`select store.create_store($1)`, [
      req.body.name,
    ]);
    const result = users?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const generateCsvById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { path } = req.body;

    const fileName = ("user-" + id + Date())
      .split(" GMT")[0]
      .replace(/\s/g, "-")
      .replace(/:/g, "-");

    const users = await pool.query(
      `select export_to_csv_by_user_id($1, $2, $3)`,
      [fileName, id, path]
    );
    const result = users?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const generateCsv = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const users = await pool.query(`select * from get_user_by_iddd($1)`, [id]);

    const fileName = ("user-" + id + Date())
      .split(" GMT")[0]
      .replace(/\s/g, "-")
      .replace(/:/g, "-");

    const result = users.rows;

    const csvFields = [
      "user_id",
      "user_name",
      "category_id",
      "category_name",
      "product_name",
      "product_name",
    ];
    const json2csvParser = new Parser({ fields: csvFields });
    const csvData = json2csvParser.parse(result);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${fileName}.csv`
    );

    res.status(200).end(csvData);
  } catch (error) {
    next(error);
  }
};
