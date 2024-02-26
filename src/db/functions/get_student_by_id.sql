CREATE OR REPLACE FUNCTION get_student_by_id(s_id INT)
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
      'id', s.student_id,
      'fullName', s.name,
      'age', s.age,
      'courses', jsonb_build_object(
        'id', c.course_id,
        'name', c.name,
        'subjects', jsonb_agg(jsonb_build_object(
          'id', subj.subject_id,
          'name', subj.name
        ))
      )
    )
    INTO result
    FROM students s
    INNER JOIN courses c ON s."course_id" = c.course_id
    INNER JOIN courses_subjects cs ON s."course_id" = cs."course_id"
	  INNER JOIN subjects subj ON cs."subject_id" = subj.subject_id
    WHERE s.student_id = s_id AND s."deleted_at" IS NULL
    GROUP BY s.student_id, s.name, s.age, c.course_id, c.name;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
