CREATE OR REPLACE FUNCTION create_or_update_subjectt(
    subject_id INT,
    subject_name VARCHAR,
    course_id INT
)
RETURNS VARCHAR
AS $$
BEGIN
    IF subject_id IS NOT NULL AND EXISTS (SELECT 1 FROM subjects WHERE id = subject_id AND "deletedAt" IS NULL) THEN

        UPDATE subjects
        SET name = subject_name, "courseId" = course_id
        WHERE id = subject_id;
        RETURN 'updated successfully';

    ELSE
        INSERT INTO subjects (name, "courseId", "createdAt", "updatedAt", "deletedAt")
        VALUES (subject_name, course_id,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
        RETURN 'created successfully';
    END IF;

END;
$$ LANGUAGE plpgsql;