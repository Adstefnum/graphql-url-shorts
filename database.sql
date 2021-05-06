

create schema links_schema;
   


CREATE OR REPLACE FUNCTION generate_uid(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;
 



CREATE TABLE links_schema.links(
 link_id varchar(6) default generate_uid(6) NOT NULL,
 org_url varchar(1000) NOT NULL,
 no_of_clicks INT NOT NULL,
 date_created Date DEFAULT now() NOT NULL );
   
   
