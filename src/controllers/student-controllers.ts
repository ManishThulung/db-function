import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await pool.query("select get_courses()");

    res.status(200).json({ result });
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

    const subjectArray = JSON.stringify(subjects).replace(/ /g, "");
    // const subjectArray = `["${subjects.join('","')}"]`;

    const course = await pool.query(
      `SELECT create_or_update_student(${id}, ${name}, ${age}, ${courseId}, ${courseName}, ${subjectArray})`
    );

    res.status(200).json({ result: course });
  } catch (error) {
    next(error);
  }
};

// export const updateStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await Student.update(
//       { age: req.body.age },
//       { where: { id: req.params.id } }
//     );
//     res.status(200).json({
//       success: true,
//       message: "update successfully",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await Student.update(
//       { deletedAt: Date.now() },
//       { where: { id: req.params.id } }
//     );
//     res.status(200).json({
//       success: true,
//       message: "deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// };
