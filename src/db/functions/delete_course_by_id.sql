CREATE OR REPLACE FUNCTION delete_course_by_id(
    p_course_id INT
)
RETURNS VOID
AS $$
BEGIN
    UPDATE "courses"
    SET "deletedAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = p_course_id;
END;
$$ LANGUAGE plpgsql;
