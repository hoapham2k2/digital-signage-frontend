CREATE 
OR REPLACE FUNCTION select_content_items_by_user(userId text) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
  (
    SELECT 
      jsonb_agg(ch) 
    FROM 
      (
        SELECT 
          p.* 
        FROM 
          content_items p 
          JOIN content_item_users pu ON p.id = pu.content_item_id 
          JOIN users u ON u.id = pu.user_id 
        WHERE 
          u.id = userId
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$
