-- 这是单行注释,不推荐使用,因为--1是mysql语句,--空格是注释
/* 这是多行注释 */

/* 创建表,在myblog项目下,名字为test1 */
CREATE TABLE `myblog`.`test2` (
  /* id int整型类型 不能为空 自增(auto_increment) */
  `id` INT NOT NULL AUTO_INCREMENT,
  /* usename varchar字符串类型,20字符个数长度 数字字母一个字符长度,中文2个字符 不能为空 */
  `username` VARCHAR(20) NOT NULL,
  /* id是主键 */
  PRIMARY KEY(`id`)
)

/* mysql执行语句对大小写是不敏感的 */
/* 但是建议使用大写,因为大家都这样用 */
/* create table `myblog`.`test1` (
  `id` int not null auto_increment,
  `username` varchar(20) not null,
  primary key(`id`)
) */
