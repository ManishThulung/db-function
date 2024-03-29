CREATE OR REPLACE FUNCTION get_user_by_idd(u_id INT)
RETURNS JSONB
AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
      'id', u.user_id,
      'name', u.name,
      'categories', jsonb_build_object(
        'c_id', c.category_id,
        'name', c.name,
        'products', jsonb_agg(jsonb_build_object(
          'p_id', p.product_id,
          'name', p.name
        ))
      )
    )
    INTO result
    FROM users u
	
	  INNER JOIN users_products up ON up.user_id = u.user_id
	  INNER JOIN products p ON p.product_id = up.product_id
    INNER JOIN categories_products cp ON cp.product_id = p.product_id
    INNER JOIN categories c ON c.category_id = cp.category_id
    WHERE u.user_id = u_id AND u."deleted_at" IS NULL
    GROUP BY u.user_id, u.name, c.category_id, c.name;

    RETURN result;
END;
$$ LANGUAGE plpgsql;


-- select u.user_id, u.name, c.category_id, c.name, p.name, p.product_id from users u
-- join users_products up on u.user_id = up.user_id
-- join categories_products cp on cp.product_id = up.product_id
-- join products p on p.product_id = cp.product_id
-- join categories c on c.category_id = cp.category_id
-- where u.user_id = 23 and u.deleted_at is null;





-- CREATE OR REPLACE FUNCTION public.get_user_by_idd(
-- 	u_id integer)
--     RETURNS json
--     LANGUAGE 'plpgsql'
--     COST 100
--     VOLATILE PARALLEL UNSAFE
-- AS $BODY$
-- DECLARE
--     result JSON;
-- BEGIN
--     SELECT jsonb_build_object(
--       'id', u.user_id,
--       'name', u.name,
--       'categories', (SELECT jsonb_build_array(jsonb_build_object(
--         'c_id', c.category_id,
--         'name', c.name,
--         'products', (SELECT jsonb_agg(jsonb_build_object(
--           'p_id', p.product_id,
--           'name', p.name
--         )))
--       )))
--     )
--     INTO result
--     FROM users u
	
-- 	  INNER JOIN users_products up ON up.user_id = u.user_id
-- 	  INNER JOIN products p ON p.product_id = up.product_id
--     INNER JOIN categories_products cp ON cp.product_id = p.product_id
--     INNER JOIN categories c ON c.category_id = cp.category_id
--     WHERE u.user_id = u_id AND u."deleted_at" IS NULL
--     GROUP BY u.user_id, u.name, c.category_id, c.name;

--     RETURN result;
-- END;
-- $BODY$;

-- ALTER FUNCTION public.get_user_by_idd(integer)
--     OWNER TO postgres;
