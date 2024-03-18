import { NextFunction, Request, Response } from "express";
import { pool } from "../db";
import { hashPassword } from "../bcrypt/password-hash";
import { comparePassword } from "../bcrypt/password-compare";
import jwt from "jsonwebtoken";
import { generate } from "otp-generator";
import { mailSender } from "../utils/mail-sender";

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

    const { passwordHash } = JSON.parse(user?.find_user);

    const isPasswordCorrect = await comparePassword(password, passwordHash);

    if (!isPasswordCorrect) {
      res.status(403).json({ message: "invalid credentials" });
      return;
    }

    let otp = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await pool.query(`select update_otp($1, $2)`, [emails, otp]);

    const mail = await mailSender(
      emails,
      "OTP Verification",
      `<h3>Verify your OPT: ${otp}</h3>`
    );

    if (mail) {
      res.status(200).json({
        message: "OTP has been sent to your email please verify it first!",
      });
    }

    res.status(200).json({ message: "try again" });
  } catch (error) {
    next(error);
  }
};

export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { emails, userOtp } = req.body;

    const ifEmailExits = await pool.query(`select check_email_if_exists($1)`, [
      emails,
    ]);

    if (!ifEmailExits?.rows[0].check_email_if_exists) {
      res.status(403).json({ message: "invalid credentials" });
      return;
    }

    const result = await pool.query(`select find_user($1)`, [emails]);
    const user = result.rows[0];
    const { email, name, otp, otpExpireTime } = JSON.parse(user?.find_user);

    const otpExpirationTime = new Date(otpExpireTime);
    otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 3);
    const currentDate = new Date();

    if (otpExpirationTime < currentDate) {
      res.status(401).json({ message: "OTP Expired!" });
      return;
    }

    if (userOtp === otp) {
      const token = jwt.sign({ name, email }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      res.status(200).json({ token });
      return;
    }
    res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    next(error);
  }
};
