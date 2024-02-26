CREATE OR REPLACE FUNCTION get_subjectsss()
RETURNS TABLE (
    "id" INT,
    "name" VARCHAR
)
AS $$
BEGIN
    RETURN QUERY SELECT
        "s"."id",
        "s"."name"
    FROM "subjects" "s"
    WHERE "s"."deletedAt" IS NULL;
END;
$$ LANGUAGE plpgsql;

-- CREATE TABLE courses(
--    course_id INT GENERATED ALWAYS AS IDENTITY,
--    name VARCHAR(255) NOT NULL,
--    PRIMARY KEY(course_id)
-- );



-- create table subjects(
-- 	subject_id int generated always as identity,
-- 	name varchar(255) not null,
-- 	primary key(subject_id)
-- );



-- create table students(
-- 	student_id int GENERATED ALWAYS AS IDENTITY,
-- 	name varchar(30) not null,
-- 	age int not null,
-- 	created_at date,
-- 	deleted_at date,
-- 	updated_at date,
-- 	primary key(student_id),
-- 	CONSTRAINT fk_course
--    		FOREIGN KEY(course_id) 
--    		REFERENCES courses(course_id)
-- );

-- create table courses_subjects(
-- 	cs_id int generated always as identity,
-- 	course_id int,
-- 	subject_id int,
-- 	primary key(subject_id),
-- 	CONSTRAINT fk_course
--    		FOREIGN KEY(course_id) 
--    		REFERENCES courses(course_id)
-- 		on delete cascade
-- 		on update cascade,
-- 	CONSTRAINT fk_subject
--    		FOREIGN KEY(subject_id) 
--    		REFERENCES subjects(subject_id)
-- 		on delete cascade
-- 		on update cascade
-- );