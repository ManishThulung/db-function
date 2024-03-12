

CREATE OR REPLACE FUNCTION public.export_to_csv(
    file_name character varying,
    t_name character varying)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    csv_file_path TEXT;
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = t_name) THEN
        csv_file_path := 'D://it-himalaya/csv/' || file_name || '.csv';

        -- Use the dynamic file path in the COPY command
        EXECUTE 'COPY ' || t_name || ' TO ' || quote_literal(csv_file_path) || ' WITH DELIMITER '','' CSV HEADER';

        RETURN 'CSV file generated: ' || csv_file_path;
    ELSE
        RETURN 'Table not found: ' || t_name;
    END IF;
END;
$BODY$;

	
	
	
	
	
	
	
	
	
	
