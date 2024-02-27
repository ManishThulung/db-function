CREATE OR REPLACE FUNCTION get_course_by_id(c_id INT)
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT
        jsonb_build_object(
            'id', "c"."course_id",
            'name', "c"."name",
            'subjects', jsonb_agg(jsonb_build_object('id', "s"."subject_id", 'name', "s"."name"))
        )
    INTO result
    FROM "courses" "c"
    INNER JOIN "subjects" "s" ON "c"."course_id" = "s"."courseId"
    INNER JOIN courses_subjects cs ON c.course_id = cs.course_id
    WHERE "c"."course_id" = c_id AND "c"."deleted_at" IS NULL
    GROUP BY "c"."course_id", "c"."name";

    RETURN result;
END;
$$ LANGUAGE plpgsql;
