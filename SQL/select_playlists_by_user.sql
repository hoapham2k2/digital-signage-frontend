CREATE 
OR REPLACE FUNCTION select_playlists_by_user(userId text) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
  (
    SELECT 
      jsonb_agg(ch) 
    FROM 
      (
        SELECT 
          p.* 
        FROM 
          playlists p 
          JOIN playlist_users pu ON p.id = pu.playlist_id 
          JOIN users u ON u.id = pu.user_id 
        WHERE 
          u.id = userId
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$
