CREATE 
OR REPLACE FUNCTION select_content_items_by_player(playerid integer) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
  (
    SELECT 
      jsonb_agg(ch) 
    FROM 
      (
       SELECT 
          p.* 
        FROM 
          content_items p 
          JOIN playlist_content_items pci ON p.id = pci.content_item_id
            JOIN playlist_labels pl ON pl.playlist_id = pci.playlist_id
            JOIN player_labels plr ON plr.label_id = pl.label_id
           WHERE 
            plr.player_id = playerid
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$
