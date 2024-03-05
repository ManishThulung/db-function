import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

// export const getProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const products = await pool.query("select get_products()");
//     const result = products?.rows[0];

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getProductById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const product = await pool.query(
//       `select get_product_by_iddd(${req.params.id})`
//     );
//     // const result = product;

//     // if (!result["get_product_by_id"]) {
//     //   res.status(404).json({ message: "Not Found!" });
//     // }

//     res.status(200).json(product);
//   } catch (error) {
//     next(error);
//   }
// };

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, category_id } = req.body;

    const course = await pool.query(
      `select create_or_update_product($1, $2, $3)`,
      [id, name, category_id]
    );

    const result = course?.rows[0];

    res.status(200).json({ result: result });
  } catch (error) {
    next(error);
  }
};
