CREATE OR REPLACE FUNCTION public.delete_student(
	s_id integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$

BEGIN
    IF s_id IS NOT NULL AND EXISTS(SELECT 1 FROM students where student_id = s_id AND deleted_at IS NULL) THEN
		UPDATE students
		SET deleted_at = CURRENT_TIMESTAMP
		WHERE student_id = s_id;
		RETURN 'data deleted!';
	ELSE
		IF s_id IS NULL THEN
			RETURN 'id is null cannot delete data!';
		ELSE
			RETURN 'id not found!';
		END IF;
	END IF;

END;
$BODY$;