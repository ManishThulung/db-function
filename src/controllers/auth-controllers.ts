import { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import { hashPassword } from "../bcrypt/password-hash";
import { comparePassword } from "../bcrypt/password-compare";
import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const ifEmailExits = await pool.query(`select check_email_if_exists($1)`, [
      email,
    ]);

    if (ifEmailExits?.rows[0].check_email_if_exists) {
      res.status(404).json({ error: "email already exists, login instead!" });
      return;
    }

    const encryptedPass = await hashPassword(password);

    const user = await pool.query(`select register_user($1, $2, $3)`, [
      name,
      email,
      encryptedPass,
    ]);
    const result = user.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emails, password } = req.body;

    const ifEmailExits = await pool.query(`select check_email_if_exists($1)`, [
      emails,
    ]);

    if (!ifEmailExits?.rows[0].check_email_if_exists) {
      res.status(403).json({ message: "invalid credentials" });
      return;
    }

    const result = await pool.query(`select find_user($1)`, [emails]);

    const user = result.rows[0];

    const { passwordHash, email, name } = JSON.parse(user?.find_user);

    const isPasswordCorrect = await comparePassword(password, passwordHash);

    if (!isPasswordCorrect) {
      res.status(403).json({ message: "invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        email,
        name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

// export const getUserById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await pool.query(`select get_user_by_idd(${req.params.id})`);
//     const result = user.rows[0];

//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, name, products } = req.body;

//     const productArray = JSON.stringify(products);

//     const course = await pool.query(
//       `select create_or_update_user($1, $2, $3)`,
//       [id, name, productArray]
//     );

//     const result = course?.rows[0];

//     res.status(200).json({ result: result });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = await pool.query(`select delete_user(${req.params.id})`);
//     const result = user?.rows[0];
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// };
