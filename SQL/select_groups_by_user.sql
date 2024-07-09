CREATE 
OR REPLACE FUNCTION select_labels_by_user(userid text) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
  (
    SELECT 
      jsonb_agg(ch) 
    FROM 
      (
        SELECT 
          l.* 
        FROM 
          labels l
          JOIN label_users lu ON l.id = lu.label_id 
        WHERE 
            lu.user_id = userid
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$