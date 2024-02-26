CREATE OR REPLACE FUNCTION create_or_update_student(
    s_id INT,
    s_name VARCHAR,
    s_age INT,
    c_id INT,
    c_name VARCHAR,
    subjects json
)
RETURNS VARCHAR
AS $$
DECLARE
    created_course_id INT;
    created_subject_id INT;
	subjects_array jsonb;
	subject VARCHAR;
BEGIN
	subjects_array := subjects::jsonb;
	
    IF c_id IS NOT NULL AND EXISTS(SELECT 1 FROM courses WHERE course_id = c_id AND "deleted_at" IS NULL) THEN
        UPDATE courses
        SET name = c_name
        WHERE course_id = c_id;

        FOR subject IN SELECT value FROM jsonb_array_elements_text(subjects_array)
            LOOP
                IF EXISTS(SELECT 1 from subjects WHERE name = subject) THEN
                    SELECT 1 from subjects WHERE name = subject RETURNING "subject_id" INTO created_subject_id;
                ELSE
                    INSERT INTO subjects (name) VALUES (subject) RETURNING "subject_id" INTO created_subject_id;
                END IF;
                
                INSERT INTO courses_subjects ("course_id", "subject_id") VALUES (c_id, created_subject_id);
            END LOOP;

        IF s_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE student_id = s_id AND "deleted_at" IS NULL) THEN
            UPDATE students
            SET name = s_name, "course_id" = c_id
            WHERE student_id = s_id;
            RETURN 'updated successfully';
        ELSE
            IF s_id IS NULL THEN
                INSERT INTO students (name, age, "course_id", "created_at", "updated_at", "deleted_at")
                VALUES (s_name, s_age, created_subject_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
                RETURN 'created successfully';
            ELSE
                RETURN "student id not found!";
            END IF;
        END IF;
    ELSE
        IF c_id IS NULL THEN
            INSERT INTO courses ("name", "created_at", "updated_at", "deleted_at")
            VALUES (c_name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
            RETURNING "course_id" INTO created_course_id;

            FOR subject IN SELECT value FROM jsonb_array_elements_text(subjects_array)
            LOOP
                IF EXISTS(SELECT 1 from subjects WHERE name = subject) THEN
                    SELECT 1 from subjects WHERE name = subject RETURNING "subject_id" INTO created_subject_id;
                ELSE
                    INSERT INTO subjects (name) VALUES (subject) RETURNING "subject_id" INTO created_subject_id;
                END IF;
                
                INSERT INTO courses_subjects ("course_id", "subject_id") VALUES (c_id, created_subject_id);
            END LOOP;

            IF s_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE student_id = s_id AND "deleted_at" IS NULL) THEN
                UPDATE students
                SET name = s_name, "course_id" = created_course_id
                WHERE student_id = s_id;
                RETURN 'updated successfully';
            ELSE
                IF s_id IS NULL THEN
                    INSERT INTO students (name, age, "course_id", "created_at", "updated_at", "deleted_at")
                    VALUES (s_name, s_age, created_course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
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
--     s_id INT,
--     s_name VARCHAR,
--     s_age INT,
--     c_id INT,
--     c_name VARCHAR,
--     subjects json
-- )
-- RETURNS VARCHAR
-- AS $$
-- DECLARE
--     created_course_id INT;
--     created_subject_id INT;
-- 	subjects_array jsonb;
-- 	subject VARCHAR;
-- BEGIN
-- 	subjects_array := subjects::jsonb;
	
--     IF c_id IS NOT NULL AND EXISTS(SELECT 1 FROM courses WHERE course_id = c_id AND "deleted_at" IS NULL) THEN
--         UPDATE courses
--         SET name = c_name
--         WHERE course_id = c_id;

--         FOR subject IN SELECT value FROM jsonb_array_elements_text(subjects_array)
--             LOOP
--                 IF EXISTS(SELECT 1 from subjects WHERE name = subject) THEN
--                     SELECT subject_id INTO created_subject_id FROM subjects WHERE name = subject;
--                 ELSE
--                     INSERT INTO subjects (name) VALUES (subject) RETURNING "subject_id" INTO created_subject_id;
--                 END IF;
                
--                 INSERT INTO courses_subjects ("course_id", "subject_id") VALUES (c_id, created_subject_id);
--             END LOOP;

--         IF s_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE student_id = s_id AND "deleted_at" IS NULL) THEN
--             UPDATE students
--             SET name = s_name, "course_id" = c_id
--             WHERE student_id = s_id;
--             RETURN 'updated successfully';
--         ELSE
--             IF s_id IS NULL THEN
--                 INSERT INTO students (name, age, "course_id", "created_at", "updated_at", "deleted_at")
--                 VALUES (s_name, s_age, created_subject_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
--                 RETURN 'created successfully';
--             ELSE
--                 RETURN "student id not found!";
--             END IF;
--         END IF;
--     ELSE
--         IF c_id IS NULL THEN
--             INSERT INTO courses ("name", "created_at", "updated_at", "deleted_at")
--             VALUES (c_name, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL)
--             RETURNING "course_id" INTO created_course_id;

--             FOR subject IN SELECT value FROM jsonb_array_elements_text(subjects_array)
--             LOOP
--                 IF EXISTS(SELECT 1 from subjects WHERE name = subject) THEN
--                     SELECT subject_id INTO created_subject_id FROM subjects WHERE name = subject;
--                 ELSE
--                     INSERT INTO subjects (name) VALUES (subject) RETURNING "subject_id" INTO created_subject_id;
--                 END IF;
				
-- 				IF NOT EXISTS (
--         			SELECT 1 FROM courses_subjects
--        				 WHERE "course_id" = created_course_id AND "subject_id" = created_subject_id
--     			) THEN
--         			INSERT INTO courses_subjects ("course_id", "subject_id") VALUES (created_course_id, created_subject_id);
--     			END IF;
                
--             END LOOP;

--             IF s_id IS NOT NULL AND EXISTS(SELECT 1 FROM students WHERE student_id = s_id AND "deleted_at" IS NULL) THEN
--                 UPDATE students
--                 SET name = s_name, "course_id" = created_course_id
--                 WHERE student_id = s_id;
--                 RETURN 'updated successfully';
--             ELSE
--                 IF s_id IS NULL THEN
--                     INSERT INTO students (name, age, "course_id", "created_at", "updated_at", "deleted_at")
--                     VALUES (s_name, s_age, created_course_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
--                     RETURN 'created successfully';
--                 ELSE
--                     RETURN 'student id not found!';
--                 END IF;
--             END IF;
--         ELSE
--             RETURN 'course id does not exist!';
--         END IF;

--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;


