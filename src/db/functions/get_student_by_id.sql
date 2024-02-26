CREATE OR REPLACE FUNCTION get_student_by_id(student_id INT)
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
      'id', s.id,
      'fullName', s."fullName",
      'age', s.age,
      'courses', jsonb_build_object(
        'id', c.id,
        'name', c.name,
        'subjects', jsonb_agg(jsonb_build_object(
          'id', subj.id,
          'name', subj.name
        ))
      )
    )
    INTO result
    FROM students s
    INNER JOIN courses c ON s."courseId" = c.id
    INNER JOIN subjects subj ON c.id = subj."courseId"
    WHERE s.id = student_id AND s."deletedAt" IS NULL
    GROUP BY s.id, s."fullName", s.age, c.id, c.name;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
