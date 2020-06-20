use myblog;
-- select * from users;
-- insert into users (username, `password`, realname) values ('lisi', '123', '李四');
-- select * from users where username like '%i%';
-- SET SQL_SAFE_UPDATES = 0;
-- update users set realname = '李四2' where username = 'lisi';
-- delete from users where username = 'lisi';
-- select * from users where state = '1';
-- update users set state = '0' where username like '%li%' ;
select
  *
from
  users
where
  state <> '0';
-- select * from users;
