CREATE OR REPLACE FUNCTION public.get_students_paginated(
    page int,
    perPage int
)
RETURNS jsonb
LANGUAGE 'plpgsql'
COST 100
VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    result JSONB;
BEGIN
    EXECUTE format('
        SELECT jsonb_agg(jsonb_build_object(
            ''id'', s.student_id,
            ''name'', s.name,
            ''age'', s.age,
            ''course_id'', s.course_id
            )
        )
        FROM (
            SELECT student_id, name, age, course_id
            FROM students
            ORDER BY student_id
            LIMIT %s OFFSET %s
        ) AS s', perPage, (page - 1) * perPage)
    INTO result;

    RETURN result;
END;
$BODY$;