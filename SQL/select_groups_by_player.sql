CREATE 
OR REPLACE FUNCTION select_labels_by_player(playerid integer) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
  (
    SELECT 
      jsonb_agg(ch) 
    FROM 
      (
        SELECT 
          l.* 
        FROM 
          labels l
          JOIN player_labels pl ON l.id = pl.label_id 
          JOIN players p ON p.id = pl.player_id
        WHERE 
            p.id = playerid
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$