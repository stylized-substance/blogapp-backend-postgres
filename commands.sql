CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INT DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES (
  'Test_author_1',
  'https://yle.fi',
  'Test_title_1'
),
(
  'Test_author_2',
  'https://yle.fi',
  'Test_title_2'
),
(
  'Test_author_3',
  'https://yle.fi',
  'Test_title_3'
);

insert into blogs (author, url, title)
values (
  "Test_author_1",
  "https://yle.fi",
  "Test_title_1"
);


insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important) values ('MongoDB is webscale', false);