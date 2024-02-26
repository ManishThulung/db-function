CREATE OR REPLACE FUNCTION get_courses()
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_agg(
            jsonb_build_object(
                'id', c.course_id,
                'name', c.name
            )
        )
    INTO result
    FROM courses c
    WHERE c.deleted_at IS NULL;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
