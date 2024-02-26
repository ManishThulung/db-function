CREATE OR REPLACE FUNCTION get_course_by_idddd(course_id INT)
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT
        jsonb_build_object(
            'id', "c"."id",
            'name', "c"."name",
            'subjects', jsonb_agg(jsonb_build_object('id', "s"."id", 'name', "s"."name"))
        )
    INTO result
    FROM "courses" "c"
    INNER JOIN "subjects" "s" ON "c"."id" = "s"."courseId"
    WHERE "c"."id" = course_id AND "c"."deletedAt" IS NULL
    GROUP BY "c"."id", "c"."name";

    RETURN result;
END;
$$ LANGUAGE plpgsql;
