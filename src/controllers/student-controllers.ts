import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const students = await pool.query("select get_students()");
    const result = students?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await pool.query(
      `select get_student_by_id(${req.params.id})`
    );
    const result = student?.rows[0];

    if (!result["get_student_by_id"]) {
      res.status(404).json({ message: "Not Found!" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, age, courseId, courseName, subjects } = req.body;

    // if (!data) {
    //   res.status(404).json({
    //     success: false,
    //     message: "Not found!",
    //   });
    // }

    const subjectArray = JSON.stringify(subjects);

    const course = await pool.query(
      `select create_or_update_student($1, $2, $3, $4, $5, $6)`,
      [id, name, age, courseId, courseName, subjectArray]
    );

    const result = course?.rows[0];

    res.status(200).json({ result: result });
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await pool.query(`select delete_student(${req.params.id})`);
    const result = student?.rows[0];
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
