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

// export const getStudentsDB = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/get_students.sql"
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
//       "SELECT * FROM get_students()"
//     );

//     res.status(200).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getStudentById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const student = await Student.findOne({
//       where: {
//         [Op.and]: {
//           id: req.params.id,
//           deletedAt: null,
//         },
//       },
//       attributes: {
//         exclude: ["createdAt", "updatedAt", "courseId", "deletedAt"],
//       },
//       include: [
//         {
//           model: Course,
//           as: "courses",
//           attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },

//           include: [
//             {
//               model: Subject,
//               as: "subjects",
//               attributes: {
//                 exclude: ["createdAt", "updatedAt", "courseId", "deletedAt"],
//               },
//             },
//           ],
//         },
//       ],
//     });

//     if (!student) {
//       res.status(404).json({
//         success: false,
//         message: "Not found!",
//       });
//     }

//     res.status(200).json({ student });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getStudentByIdDB = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/get_student_by_id.sql"
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
//       `SELECT * FROM get_student_by_id(${req.params.id})`
//     );
//     const data = result && result[0]["get_student_by_id"];

//     if (!data) {
//       res.status(404).json({
//         success: false,
//         message: "Not found!",
//       });
//     }

//     res.status(200).json({ data });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createStudent = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, fullName, age, courseId, courseName, subjects } = req.body;

//     const courseData = {
//       id: courseId,
//       name: courseName,
//     };

//     const courseInstance = await Course.upsert(courseData, {
//       returning: true,
//     });

//     if (subjects) {
//       subjects.forEach(async (subject: any) => {
//         const existSubject = await Subject.findOne({
//           where: {
//             name: subject,
//           },
//         });

//         let newSubject;
//         if (!existSubject) {
//           newSubject = await Subject.create({
//             name: subject,
//             courseId: courseInstance[0]?.dataValues?.id,
//           });
//         }
//       });
//     }

//     const data = {
//       id: id,
//       fullName,
//       age,
//       courseId: courseInstance[0]?.dataValues?.id,
//     };

//     const instance = await Student.upsert(data, {
//       returning: true,
//     });

//     if (instance) {
//       return res.status(201).json({ data: instance[0] });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const createStudentDB = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id, fullName, age, courseId, courseName, subjects } = req.body;

//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/create_student.sql"
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
//       `SELECT * FROM create_or_update_studenttt(${id}, '${fullName}', ${age}, ${courseId}, '${courseName}')`
//     );
//     // const data = result && result[0]["get_student_by_id"];

//     // if (!data) {
//     //   res.status(404).json({
//     //     success: false,
//     //     message: "Not found!",
//     //   });
//     // }

//     res.status(200).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };

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
