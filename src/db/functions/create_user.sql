CREATE OR REPLACE FUNCTION create_or_update_user(
  u_id INT,
  u_name VARCHAR,
  products json
)
RETURNS VARCHAR
AS $$
DECLARE
  created_user_id INT;
  created_category_id INT;
  created_product_id INT;
	products_array jsonb;
	product jsonb;
	quantity INTEGER;
BEGIN
	products_array := products::jsonb;
     
  IF u_id IS NOT NULL AND EXISTS(SELECT 1 FROM users WHERE user_id = u_id AND "deleted_at" IS NULL) THEN
    UPDATE users
    SET name = u_name, "updated_at" = now()
    WHERE user_id = u_id;

    FOR product IN SELECT value::jsonb FROM jsonb_array_elements(products_array)
    LOOP
      -- for category
      IF EXISTS (SELECT 1 from categories WHERE name = product->>'category') THEN
		SELECT "category_id" INTO created_category_id FROM categories WHERE name = product->>'category';
      ELSE 
        INSERT INTO categories (name) VALUES (product->>'category') RETURNING "category_id" INTO created_category_id;
      END IF;

      -- for product
      IF EXISTS(SELECT 1 from products WHERE name = product->>'product') THEN
       SELECT "product_id" INTO created_product_id FROM products WHERE name = product->>'product';
      ELSE
        INSERT INTO products (name) VALUES (product->>'product') RETURNING "product_id" INTO created_product_id;
      END IF;

      -- for categories_products
      IF NOT EXISTS(SELECT 1 from categories_products WHERE category_id = created_category_id AND product_id = created_product_id) THEN
        INSERT INTO categories_products ("category_id", "product_id") VALUES (created_category_id, created_product_id);
      END IF;
      
      -- for users_products
      IF NOT EXISTS (SELECT 1 from users_products WHERE user_id = u_id AND product_id = created_product_id) THEN
        quantity := product->>'qty';
        INSERT INTO users_products ("user_id", "product_id", "product_quantity") VALUES (u_id, created_product_id, quantity);
      END IF;
    END LOOP;
    RETURN 'updated successfully';
  ELSE
    IF u_id IS NULL THEN
      INSERT INTO users (name, "created_at", "updated_at", "deleted_at")
      VALUES (u_name, now(), now(), NULL) RETURNING "user_id" INTO created_user_id;

--       FOR product IN SELECT value FROM jsonb_array_elements_text(products_array)
	  FOR product IN SELECT value::jsonb FROM jsonb_array_elements(products_array)
      LOOP
        -- for category
      	IF EXISTS (SELECT 1 from categories WHERE name = product->>'category') THEN
			SELECT "category_id" INTO created_category_id FROM categories WHERE name = product->>'category';
      	ELSE 
        	INSERT INTO categories (name) VALUES (product->>'category') RETURNING "category_id" INTO created_category_id;
      	END IF;

      	-- for product
      	IF EXISTS(SELECT 1 from products WHERE name = product->>'product') THEN
       		SELECT "product_id" INTO created_product_id FROM products WHERE name = product->>'product';
     	ELSE
        	INSERT INTO products (name) VALUES (product->>'product') RETURNING "product_id" INTO created_product_id;
      	END IF;

        -- for categories_products
        IF NOT EXISTS(SELECT 1 from categories_products WHERE category_id = created_category_id AND product_id = created_product_id) THEN
          INSERT INTO categories_products ("category_id", "product_id") VALUES (created_category_id, created_product_id);
        END IF;

        -- for users_products
        IF NOT EXISTS (SELECT 1 from users_products WHERE user_id = created_user_id AND product_id = created_product_id) THEN
          quantity := product->>'qty';
		      INSERT INTO users_products ("user_id", "product_id", "product_quantity") VALUES (created_user_id, created_product_id, quantity);
        END IF;
      END LOOP;

      RETURN 'created successfully';
    ELSE
      RETURN "student id not found!";
    END IF;
  END IF;

END;
$$ LANGUAGE plpgsql;