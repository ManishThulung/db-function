CREATE OR REPLACE FUNCTION create_or_update_studenttt(
    student_id INT,
    student_fullName VARCHAR,
    student_age INT,
    course_id INT,
    course_name VARCHAR
)
RETURNS VARCHAR
AS $$
DECLARE
    created_course_id INT;
BEGIN
    IF course_id IS NOT NULL AND EXISTS(SELECT 1 FROM courses WHERE id = course_id AND "deletedAt" IS NULL) THEN
        UPDATE courses
        SET name = course_name
        WHERE id = course_id;

        IF student_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE id = student_id AND "deletedAt" IS NULL) THEN
            UPDATE students
            SET "fullName" = student_fullName, "courseId" = course_id
            WHERE id = student_id;
            RETURN 'updated successfully';
        ELSE
            IF student_id IS NULL THEN
                INSERT INTO students ("fullName", age, "courseId", "createdAt", "updatedAt", "deletedAt")
                VALUES (student_fullName, student_age, course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
                RETURN 'created successfully';
            ELSE
                RETURN "student id not found!";
            END IF;
        END IF;
    ELSE
        IF course_id IS NULL THEN
            INSERT INTO courses ("name", "createdAt", "updatedAt", "deletedAt")
            VALUES (course_name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
            RETURNING "id" INTO created_course_id;

            IF student_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE id = student_id AND "deletedAt" IS NULL) THEN
                UPDATE students
                SET "fullName" = student_fullName, "courseId" = created_course_id
                WHERE id = student_id;
                RETURN 'updated successfully';
            ELSE
                IF student_id IS NULL THEN
                    INSERT INTO students ("fullName", age, "courseId", "createdAt", "updatedAt", "deletedAt")
                    VALUES (student_fullName, student_age, course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
                    RETURN 'created successfully';
                ELSE
                    RETURN 'student id not found!';
                END IF;
            END IF;
        ELSE
            RETURN 'course id does not exist!';
        END IF;

    END IF;
END;
$$ LANGUAGE plpgsql;



-- CREATE OR REPLACE FUNCTION create_or_update_student(
--     student_id INT,
--     student_fullName VARCHAR,
--     student_age INT,
--     course_id INT,
--     course_name VARCHAR,
--     subjects VARCHAR[]
-- )
-- RETURNS VARCHAR
-- AS $$
-- BEGIN
--     IF student_id IS NOT NULL THEN
--         -- Update existing student
--         UPDATE students
--         SET
--             fullName = student_fullName,
--             age = student_age
--         WHERE id = student_id;

--         IF NOT FOUND THEN
--             RETURN 'Student not found';
--         END IF;

--         -- Update existing course
--         UPDATE courses
--         SET
--             name = course_name
--         WHERE id = course_id;

--         -- Delete existing subjects for the course
--         DELETE FROM subjects WHERE courseId = course_id;

--         -- Insert new subjects
--         FOREACH subj IN ARRAY subjects
--         LOOP
--             INSERT INTO subjects (name, courseId) VALUES (subj, course_id);
--         END LOOP;

--         RETURN 'Student and Course updated successfully';
--     ELSE
--         -- Insert new student
--         INSERT INTO students (fullName, age) VALUES (student_fullName, student_age) RETURNING id INTO student_id;

--         -- Insert new course
--         INSERT INTO courses (id, name) VALUES (course_id, course_name) ON CONFLICT (id) DO UPDATE SET name = course_name;

--         -- Insert new subjects
--         FOREACH subj IN ARRAY subjects
--         LOOP
--             INSERT INTO subjects (name, courseId) VALUES (subj, course_id);
--         END LOOP;

--         RETURN 'Student and Course created successfully';
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;
