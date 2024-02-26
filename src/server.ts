import express, { Express, NextFunction, Request, Response } from "express";
import StudentRouter from "./routes/student-routes";
import CourseRouter from "./routes/course-routes";
import SubjectRouter from "./routes/subject-routes";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// app.get("/test", async (req: Request, res: Response) => {
//   const result = await pool.query("SELECT * FROM test", (err, result) => {
//     if (err) {
//       console.error("Error executing query:", err);
//     } else {
//       const response = result?.rows;
//       res.status(200).json({ response });
//     }
//   });
//   console.log(result, "result");
// });

app.use("/api/students", StudentRouter);
app.use("/api/courses", CourseRouter);
app.use("/api/subjects", SubjectRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal server error";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
