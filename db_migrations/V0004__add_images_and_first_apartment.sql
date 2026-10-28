ALTER TABLE t_p44352831_mortgage_new_builds.properties ADD COLUMN IF NOT EXISTS images TEXT[];

INSERT INTO t_p44352831_mortgage_new_builds.properties
(title, developer, location, city, district, price_from, image_url, images, rooms, description, area_from, area_to, is_active)
VALUES
('1-комнатная квартира, 42 кв.м', NULL, 'Барбошина Поляна', 'Самара', NULL, 9002700,
 'https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/bucket/26a34671-0c7b-420b-ad8a-e4ca929754aa.jpg',
 ARRAY['https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/bucket/26a34671-0c7b-420b-ad8a-e4ca929754aa.jpg','https://cdn.poehali.dev/projects/1a7c493f-b51e-41cc-b773-168038db319d/bucket/e4fcf0ca-1ea5-41a2-a967-1819f98eba44.jpg'],
 '1', '1-комнатная квартира в Барбошиной Поляне, 42 кв.м', 42, 42, true);