import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

export const getCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await pool.query("select get_courses()");
    const result = courses?.rows[0];

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await pool.query(
      `select get_course_by_id(${req.params.id})`
    );
    const result = student?.rows[0];
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// export const deleteCourse = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     // await Course.update(
//     //   { deletedAt: Date.now() },
//     //   { where: { id: req.params.id } }
//     // );

//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/delete_course_by_id.sql"
//     );
//     try {
//       sql = fs.readFileSync(filePath).toString();
//     } catch (error) {
//       console.log(error);
//     }

//     await sequelize.query(sql, {
//       type: QueryTypes.RAW,
//     } as QueryOptions | QueryOptionsWithType<QueryTypes.RAW>);

//     const [result, ...other] = await sequelize.query(
//       `SELECT delete_course_by_id(${req.params.id})`
//     );

//     res.status(200).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };
