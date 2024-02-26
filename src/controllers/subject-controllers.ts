import { NextFunction, Request, Response } from "express";

export const getSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ data: "subjects" });
  } catch (error) {
    next(error);
  }
};

// export const getSubjectsDB = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/get_subjects.sql"
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
//       `SELECT * FROM get_subjectsss()`
//     );

//     res.status(200).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSubjectById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const subject = await Subject.findOne({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.status(200).json({
//       success: true,
//       message: "get subject by id",
//       data: subject,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createSubject = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const subject = await Subject.create({
//       name: req.body.name,
//       courseId: req.body.courseId,
//     });
//     res.status(200).json({
//       success: true,
//       message: "this is to get all subjects details",
//       data: subject,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const createSubjectDB = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { subjectId, name, courseId } = req.body;
//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/create_subject.sql"
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
//       `SELECT * FROM create_or_update_subjectt(${subjectId}, '${name}', ${courseId})`
//     );

//     res.status(200).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateSubject = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await Subject.update(
//       { name: req.body.name },
//       { where: { id: req.params.id } }
//     );
//     res.status(200).json({
//       success: true,
//       message: "updated",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteSubject = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     let sql;

//     const filePath = path.resolve(
//       __dirname,
//       "../db/functions/delete_subject_by_id.sql"
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
//       `SELECT delete_subject_by_id(${req.params.id})`
//     );

//     res.status(200).json({ result });
//   } catch (error) {
//     next(error);
//   }
// };
