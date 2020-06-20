create table `blog`.`blogs` {
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGBOLB NOT NULL,
  `createTime` BIGINT(20) NOT NULL,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY(`id`),
}

CHANGE COLUMN `content` `content` LONGTEXT NOT NULL;
