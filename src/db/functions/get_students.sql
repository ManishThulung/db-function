CREATE OR REPLACE FUNCTION get_students()
RETURNS TABLE (
    "id" INT,
    "fullName" VARCHAR,
    "age" INT,
    "courseId" INT
)
AS $$
BEGIN
    RETURN QUERY SELECT
        "s"."id",
        "s"."fullName",
        "s"."age",
        "s"."courseId"
    FROM "students" "s"
    WHERE "s"."deletedAt" IS NULL;
END;
$$ LANGUAGE plpgsql;