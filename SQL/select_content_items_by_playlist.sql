CREATE 
OR REPLACE FUNCTION select_content_items_by_playlist(playlistid integer) RETURNS JSONB LANGUAGE PLPGSQL AS $$ BEGIN RETURN COALESCE(
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
            WHERE 
                pci.playlist_id = playlistid
      ) ch
  ), 
  '[]' :: jsonb
);
END;
$$
