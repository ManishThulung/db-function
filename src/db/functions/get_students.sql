CREATE OR REPLACE FUNCTION get_students()
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_agg(jsonb_build_object(
    	'id', s.student_id,
        'name', s.name,
		'age', s.age,
		'course_id', s.course_id
      )
    )
    INTO result
    FROM students s
    WHERE s."deleted_at" IS NULL;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
