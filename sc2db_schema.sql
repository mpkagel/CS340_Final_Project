/*************************************************************
** File Name: sc2db_schema.sql
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the database file that creates tables.
*************************************************************/

SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `building`;
DROP TABLE IF EXISTS `game`;
DROP TABLE IF EXISTS `map`;
DROP TABLE IF EXISTS `player`;
DROP TABLE IF EXISTS `player_game`;
DROP TABLE IF EXISTS `player_game_building`;
DROP TABLE IF EXISTS `player_game_unit`;
DROP TABLE IF EXISTS `unit`;

CREATE TABLE `building` (
  `building_id` INT NOT NULL AUTO_INCREMENT,
  `bld_name` VARCHAR(255) NOT NULL,
  `race` ENUM('Protoss','Terran','Zerg') NOT NULL,
  `mineral_cost` INT NOT NULL DEFAULT 0,
  `vespene_cost` INT NOT NULL DEFAULT 0,
  `build_time` INT NOT NULL DEFAULT 0,
  `life` INT NOT NULL DEFAULT 0,
  `shields` INT,
  `armor` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`building_id`),
  UNIQUE KEY (`bld_name`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `game` (
  `game_id` INT NOT NULL AUTO_INCREMENT,
  `map_id` INT,
  `game_name` VARCHAR(255) NOT NULL,
  `game_type` ENUM('1v1','2v2','3v3','4v4') NOT NULL,
  `game_time` TIME DEFAULT 0,
  `date_played` DATE DEFAULT '00-00-00',
  PRIMARY KEY (`game_id`),
  UNIQUE KEY (`game_name`),
  CONSTRAINT `game_fk_1` FOREIGN KEY (`map_id`) REFERENCES `map` (`map_id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `map` (
  `map_id` INT NOT NULL AUTO_INCREMENT,
  `map_name` VARCHAR(255) NOT NULL,
  `map_type` ENUM('1v1','2v2','3v3','4v4') NOT NULL,
  `horizontal_length` INT NOT NULL,
  `vertical_length` INT NOT NULL,
  `designer` VARCHAR(255),
  `tile_set` VARCHAR(255),
  PRIMARY KEY (`map_id`),
  UNIQUE KEY (`map_name`)  
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `player` (
  `player_id` INT NOT NULL AUTO_INCREMENT,
  `player_name` VARCHAR(255) NOT NULL,
  `wins` INT NOT NULL DEFAULT 0,
  `losses` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`player_id`),
  UNIQUE KEY (`player_name`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

CREATE TABLE `player_game` (
  `game_id` INT NOT NULL,
  `player_id` INT NOT NULL,
  `outcome` ENUM('Won','Lost') NOT NULL,
  `race` ENUM('Protoss','Terran','Zerg') NOT NULL,
  `team` INT,
  PRIMARY KEY (`game_id`,`player_id`),
  CONSTRAINT `player_game_fk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `player_game_fk_2` FOREIGN KEY (`player_id`) REFERENCES `player` (`player_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `player_game_building` (
  `game_id` INT NOT NULL,
  `player_id` INT NOT NULL,
  `building_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`game_id`,`player_id`,`building_id`),
  CONSTRAINT `player_game_building_fk_1` FOREIGN KEY (`game_id`,`player_id`) REFERENCES `player_game` (`game_id`,`player_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `player_game_building_fk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `player_game_unit` (
  `game_id` INT NOT NULL,
  `player_id` INT NOT NULL,
  `unit_id` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`game_id`,`player_id`,`unit_id`),
  CONSTRAINT `player_game_unit_fk_1` FOREIGN KEY (`game_id`,`player_id`) REFERENCES `player_game` (`game_id`,`player_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `player_game_unit_fk_2` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`unit_id`) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `unit` (
  `unit_id` INT NOT NULL AUTO_INCREMENT,
  `unit_name` VARCHAR(255) NOT NULL,
  `race` ENUM('Protoss','Terran','Zerg') NOT NULL,
  `mineral_cost` INT NOT NULL DEFAULT 0,
  `vespene_cost` INT NOT NULL DEFAULT 0,
  `build_time` INT NOT NULL DEFAULT 0,
  `life` INT NOT NULL DEFAULT 0,
  `shields` INT,
  `armor` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`unit_id`),
  UNIQUE KEY (`unit_name`)
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS=1;