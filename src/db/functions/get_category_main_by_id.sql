CREATE OR REPLACE FUNCTION public.get_main_category_by_id(
	c_id integer)
    RETURNS json
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    result JSON;
BEGIN
    SELECT jsonb_build_object(
      'id', c.category_id,
      'name', c.name,
       'subCategories', (SELECT jsonb_agg(jsonb_build_object(
          	'id', c.category_id,
          	'name', c.name,
			'products', (SELECT jsonb_agg(jsonb_build_object(
          		'id', p.product_id,
          		'name', p.name
       			))
				FROM products p
				join categories_products cp on p.product_id = cp.product_id
				WHERE cp.category_id = c.category_id
				)
        	))
			from categories c
			where c.parent_id = c_id
		)
    )
	into result
    FROM categories c
    WHERE c.category_id = c_id
    GROUP BY c.category_id, c.name;

    RETURN result;
END;
$BODY$;