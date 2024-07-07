-- players , player_users, users
-- dbms: postgresql
CREATE 
OR REPLACE FUNCTION select_players_by_userId(userId text) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
  (
    SELECT 
      jsonb_agg(ch) 
    FROM 
      (
        SELECT 
          p.* 
        FROM 
          players p 
          JOIN player_users pu ON p.id = pu.player_id 
          JOIN users u ON u.id = pu.user_id 
        WHERE 
          u.id = userId
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$
