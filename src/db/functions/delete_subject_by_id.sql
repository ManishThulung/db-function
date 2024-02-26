CREATE OR REPLACE FUNCTION delete_subject_by_id(
    subject_id INT
)
RETURNS VOID
AS $$
BEGIN
    UPDATE "subjects"
    SET "deletedAt" = CURRENT_TIMESTAMP, "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = subject_id;
END;
$$ LANGUAGE plpgsql;
