/*************************************************************
** File Name: sc2db_table_insert_queries.sql
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the file that populates the database tables.
*************************************************************/

LOCK TABLES `map` WRITE;
INSERT INTO `map` (map_name, map_type, horizontal_length, vertical_length, designer, tile_set) VALUES
('Abyssal Reef LE', 		'1v1', 	152, 	136, 	'SidianTheBard', 	'Elsecaro'),
('Acolyte LE', 				'1v1', 	136, 	168, 	'Enekh', 			'Jarban Minor Jungle Copy'),
('Ascension to Aiur LE', 	'1v1', 	160, 	132, 	'SidianTheBard', 	'(Void) Aiur04 Temple'),
('Interloper LE', 			'1v1', 	134, 	142, 	'NegativeZero', 	'Elsecaro'),
('Mech Depot LE', 			'1v1', 	152, 	152, 	'IronManSC', 		'Elsecaro'),
('Odyssey LE', 				'1v1', 	152, 	156, 	'AVEX', 			'Meinhoff Ex3'),
('Catallena LE (Void)', 	'1v1', 	164, 	164, 	'Timmay', 			'Various'),
('Arctic Gates',	 		'2v2', 	160, 	152, 	'Blizzard', 		'Ice World Ex2'),
('Flooded City', 			'2v2', 	236, 	228, 	'Blizzard', 		'(Void) Shakuras City'),
('Overgrown Facility', 		'2v2', 	196, 	214, 	'Blizzard',		 	'(Void) Endion'),
('Shadowed Jungle', 		'2v2', 	124, 	160, 	'Blizzard', 		'Jarban Minor Jungle'),
('Shrines of Lizul', 		'2v2', 	152, 	152, 	'Blizzard', 		'(Void) Shakuras Temple'),
('Snowy Mesa', 				'2v2', 	152, 	160, 	'Blizzard', 		'Snow Refinery'),
('Traitors Exile', 			'2v2', 	140, 	144, 	'Blizzard', 		'(Void) Slayn'),
('Abandoned Camp',		 	'3v3', 	164, 	148, 	'Blizzard', 		'(HotS) Kaldir (Ice)'),
('Bastion of the Conclave', '3v3', 	165, 	160, 	'Blizzard', 		'(Void) Protoss Base'),
('Black Site 2E', 			'3v3', 	192, 	192, 	'Blizzard', 		'Black Ops Lab A'),
('Fields of Shazir', 		'3v3', 	225, 	144, 	'Blizzard', 		'(Void) Shakuras Temple'),
('Misty Swamp',			 	'3v3', 	236, 	228, 	'Blizzard', 		'Jarban Minor Jungle'),
('Orbital Depot', 			'3v3', 	176, 	192, 	'Blizzard', 		'(Void) Castanar'),
('Ujari', 					'3v3', 	216, 	142, 	'Blizzard', 		'(Void) Prologue-Xel Naga Cavern'),
('Alaeni Enclave', 			'4v4', 	180, 	196, 	'Blizzard', 		'Black Ops Lab A'),
('Last Remnant', 			'4v4', 	132, 	176, 	'Blizzard', 		'Monlyth (Lunar)'),
('Old Estate', 				'4v4', 	188, 	196, 	'Blizzard',	 		'Compound Mansion'),
('Primeval Wilds', 			'4v4', 	132, 	180, 	'Blizzard', 		'Elsecaro'),
('Refinery XJ-17', 			'4v4', 	156, 	152, 	'Blizzard', 		'(Void) Korhal City'),
('Rooftop Terrace', 		'4v4', 	232, 	248, 	'Blizzard', 		'(Void) Korhal City'),
('Tropic Shores', 			'4v4', 	172, 	152, 	'Blizzard', 		'Elsecaro');
UNLOCK TABLES;

/* Final Project Query for Game Insert */

LOCK TABLES `game` WRITE, `map` READ;
SET @mid1 = (SELECT map_id FROM `map` WHERE map_name = 'Refinery XJ-17');
SET @mid2 = (SELECT map_id FROM `map` WHERE map_name = 'Primeval Wilds');
SET @mid3 = (SELECT map_id FROM `map` WHERE map_name = 'Orbital Depot');
SET @mid4 = (SELECT map_id FROM `map` WHERE map_name = 'Ujari');
SET @mid5 = (SELECT map_id FROM `map` WHERE map_name = 'Flooded City');
SET @mid6 = (SELECT map_id FROM `map` WHERE map_name = 'Shrines of Lizul');
SET @mid7 = (SELECT map_id FROM `map` WHERE map_name = 'Interloper LE');
SET @mid10 = (SELECT map_id FROM `map` WHERE map_name = 'Odyssey LE');
SET @mid12 = (SELECT map_id FROM `map` WHERE map_name = 'Acolyte LE');
SET @mid13 = (SELECT map_id FROM `map` WHERE map_name = 'Catallena LE (Void)');
SET @mid14 = (SELECT map_id FROM `map` WHERE map_name = 'Abyssal Reef LE');
SET @mid16 = (SELECT map_id FROM `map` WHERE map_name = 'Mech Depot LE');
INSERT INTO `game` (map_id, game_name, game_type, game_time, date_played) VALUES
(@mid1,   'Game 1',		'4v4',   '00:39:12', '2012-05-04'),
(@mid2,   'Game 2',		'4v4',   '00:15:55', '2014-10-31'),
(@mid3,   'Game 3',		'3v3',   '00:05:00', '2015-08-30'),
(@mid4,   'Game 4',		'3v3',   '00:32:47', '2017-04-03'),
(@mid5,   'Game 5',		'2v2',   '01:15:25', '2016-06-22'),
(@mid6,   'Game 6',		'2v2',   '00:25:47', '2015-07-28'),
(@mid7,   'Game 7',		'1v1',	  '00:08:00', '2014-02-05'),
(@mid7,   'Game 8',		'1v1',   '00:08:00', '2014-02-07'),
(@mid7,   'Game 9',		'1v1',   '00:08:00', '2014-02-10'),
(@mid10,   'Game 10',	'1v1',   '00:07:00', '2017-05-06'),
(@mid10,   'Game 11',	'1v1',   '00:15:00', '2017-05-06'),
(@mid12,   'Game 12',	'1v1',   '00:33:12', '2016-07-18'),
(@mid13,   'Game 13',	'1v1',   '00:24:40', '2013-03-13'),
(@mid14,   'Game 14',	'1v1',   '00:28:42', '2015-01-16'),
(@mid10,   'Game 15',	'1v1',   '00:16:39', '2012-09-28'),
(@mid16,   'Game 16',	'1v1',   '00:22:41', '2016-11-14');
UNLOCK TABLES;

/* Final Project Query for Player Insert */

LOCK TABLES `player` WRITE;
INSERT INTO `player` (player_name, wins, losses) VALUES
('OGBaller', 		278, 	55),
('PardonMyPylon', 	110, 	115),
('Blaztos', 		43, 	18),
('SixPoolSam', 		785, 	332),
('DalaiLarva', 		522, 	621),
('BubbaSwoll', 		11, 	25),
('NeMeSiS', 		60, 	88),
('Zelgadis', 		75, 	14),
('Elsenova', 		1265, 	456),
('Krusher', 		908, 	834),
('RuJ', 			35, 	16),
('HiddenHydras', 	378, 	516),
('Puck',		 	90, 	56),
('ToX', 			145, 	280),
('ZealousBrining', 	239, 	55),
('Aggers',   		788, 	1000);
UNLOCK TABLES;

/* Final Project Query for Player-Game Insert */

LOCK TABLES `player_game` WRITE, `game` READ, `player` READ;
SET @gid1 = (SELECT game_id FROM `game` WHERE game_name = 'Game 1');
SET @gid2 = (SELECT game_id FROM `game` WHERE game_name = 'Game 2');
SET @gid3 = (SELECT game_id FROM `game` WHERE game_name = 'Game 3');
SET @gid4 = (SELECT game_id FROM `game` WHERE game_name = 'Game 4');
SET @gid5 = (SELECT game_id FROM `game` WHERE game_name = 'Game 5');
SET @gid6 = (SELECT game_id FROM `game` WHERE game_name = 'Game 6');
SET @gid7 = (SELECT game_id FROM `game` WHERE game_name = 'Game 7');
SET @gid8 = (SELECT game_id FROM `game` WHERE game_name = 'Game 8');
SET @gid9 = (SELECT game_id FROM `game` WHERE game_name = 'Game 9');
SET @gid10 = (SELECT game_id FROM `game` WHERE game_name = 'Game 10');
SET @gid11 = (SELECT game_id FROM `game` WHERE game_name = 'Game 11');
SET @gid12 = (SELECT game_id FROM `game` WHERE game_name = 'Game 12');
SET @gid13 = (SELECT game_id FROM `game` WHERE game_name = 'Game 13');
SET @gid14 = (SELECT game_id FROM `game` WHERE game_name = 'Game 14');
SET @gid15 = (SELECT game_id FROM `game` WHERE game_name = 'Game 15');
SET @gid16 = (SELECT game_id FROM `game` WHERE game_name = 'Game 16');
SET @pid1 = (SELECT player_id FROM `player` WHERE player_name = 'OGBaller');
SET @pid2 = (SELECT player_id FROM `player` WHERE player_name = 'PardonMyPylon');
SET @pid3 = (SELECT player_id FROM `player` WHERE player_name = 'Blaztos');
SET @pid4 = (SELECT player_id FROM `player` WHERE player_name = 'SixPoolSam');
SET @pid5 = (SELECT player_id FROM `player` WHERE player_name = 'DalaiLarva');
SET @pid6 = (SELECT player_id FROM `player` WHERE player_name = 'BubbaSwoll');
SET @pid7 = (SELECT player_id FROM `player` WHERE player_name = 'NeMeSiS');
SET @pid8 = (SELECT player_id FROM `player` WHERE player_name = 'Zelgadis');
SET @pid9 = (SELECT player_id FROM `player` WHERE player_name = 'Elsenova');
SET @pid10 = (SELECT player_id FROM `player` WHERE player_name = 'Krusher');
SET @pid11 = (SELECT player_id FROM `player` WHERE player_name = 'RuJ');
SET @pid12 = (SELECT player_id FROM `player` WHERE player_name = 'HiddenHydras');
SET @pid13 = (SELECT player_id FROM `player` WHERE player_name = 'Puck');
SET @pid14 = (SELECT player_id FROM `player` WHERE player_name = 'ToX');
SET @pid15 = (SELECT player_id FROM `player` WHERE player_name = 'ZealousBrining');
SET @pid16 = (SELECT player_id FROM `player` WHERE player_name = 'Aggers');
INSERT INTO `player_game` VALUES
(@gid1, @pid1, 'Won', 'Zerg', 0),
(@gid1, @pid3, 'Won', 'Zerg', 0),
(@gid1, @pid5, 'Won', 'Zerg', 0),
(@gid1, @pid6, 'Won', 'Zerg', 0),
(@gid1, @pid8, 'Lost', 'Protoss', 1),
(@gid1, @pid10, 'Lost', 'Protoss', 1),
(@gid1, @pid11, 'Lost', 'Protoss', 1),
(@gid1, @pid16, 'Lost', 'Protoss', 1),
(@gid2, @pid1, 'Lost', 'Terran', 0),
(@gid2, @pid2, 'Lost', 'Zerg', 0),
(@gid2, @pid5, 'Lost', 'Zerg', 0),
(@gid2, @pid10, 'Lost', 'Terran', 0),
(@gid2, @pid12, 'Won', 'Terran', 1),
(@gid2, @pid13, 'Won', 'Protoss', 1),
(@gid2, @pid14, 'Won', 'Terran', 1),
(@gid2, @pid15, 'Won', 'Protoss', 1),
(@gid3, @pid5, 'Lost', 'Terran', 0),
(@gid3, @pid6, 'Lost', 'Terran', 0),
(@gid3, @pid7, 'Lost', 'Terran', 0),
(@gid3, @pid10, 'Won', 'Protoss', 1),
(@gid3, @pid11, 'Won', 'Protoss', 1),
(@gid3, @pid12, 'Won', 'Protoss', 1),
(@gid4, @pid1, 'Won', 'Zerg', 0),
(@gid4, @pid3, 'Won', 'Terran', 0),
(@gid4, @pid9, 'Won', 'Protoss', 0),
(@gid4, @pid13, 'Lost', 'Terran', 1),
(@gid4, @pid15, 'Lost', 'Protoss', 1),
(@gid4, @pid16, 'Lost', 'Zerg', 1),
(@gid5, @pid2, 'Lost', 'Terran', 0),
(@gid5, @pid7, 'Lost', 'Protoss', 0),
(@gid5, @pid8, 'Won', 'Zerg', 1),
(@gid5, @pid9, 'Won', 'Zerg', 1),
(@gid6, @pid4, 'Lost', 'Zerg', 0),
(@gid6, @pid11, 'Lost', 'Terran', 0),
(@gid6, @pid15, 'Won', 'Terran', 1),
(@gid6, @pid16, 'Won', 'Protoss', 1),
(@gid7, @pid1, 'Won', 'Protoss', NULL),
(@gid7, @pid7, 'Lost', 'Zerg', NULL),
(@gid8, @pid1, 'Lost', 'Protoss', NULL),
(@gid8, @pid7, 'Won', 'Zerg', NULL),
(@gid9, @pid1, 'Won', 'Protoss', NULL),
(@gid9, @pid7, 'Lost', 'Zerg', NULL),
(@gid10, @pid9, 'Won', 'Terran', NULL),
(@gid10, @pid14, 'Lost', 'Terran', NULL),
(@gid11, @pid9, 'Won', 'Terran', NULL),
(@gid11, @pid14, 'Lost', 'Terran', NULL),
(@gid12, @pid13, 'Lost', 'Terran', NULL),
(@gid12, @pid15, 'Won', 'Zerg', NULL),
(@gid13, @pid8, 'Lost', 'Protoss', NULL),
(@gid13, @pid16, 'Won', 'Protoss', NULL),
(@gid14, @pid11, 'Won', 'Protoss', NULL),
(@gid14, @pid14, 'Lost', 'Terran', NULL),
(@gid15, @pid6, 'Won', 'Zerg', NULL),
(@gid15, @pid10, 'Lost', 'Zerg', NULL),
(@gid16, @pid4, 'Lost', 'Terran', NULL),
(@gid16, @pid5, 'Won', 'Zerg', NULL);
UNLOCK TABLES;

/* Final Project Query for Building Insert */

LOCK TABLES `building` WRITE;
INSERT INTO `building` (bld_name, race, mineral_cost, vespene_cost, build_time, life, shields, armor) VALUES
('Nexus', 			 	'Protoss', 	400, 	0, 		71, 	1000, 	1000, 	1),
('Pylon', 			 	'Protoss', 	100, 	0, 		18, 	200, 	200, 	1),
('Assimilator', 	 	'Protoss', 	75, 	0, 		21, 	450, 	450, 	1),
('Gateway', 		 	'Protoss', 	150, 	0, 		46, 	500, 	500, 	1),
('Forge', 			 	'Protoss', 	150, 	0, 		32, 	400, 	400, 	1),
('Photon Cannon', 	 	'Protoss', 	150, 	0, 		29, 	150, 	150, 	1),
('Warpgate', 		 	'Protoss', 	0, 		0, 		7, 		500, 	500, 	1),
('Cybernetics Core', 	'Protoss', 	150, 	0, 		36, 	550, 	550, 	1),
('Twilight Council', 	'Protoss', 	150, 	100, 	36, 	500, 	500, 	1),
('Robotics Facility', 	'Protoss', 	200, 	100, 	46, 	450, 	450, 	1),
('Stargate', 			'Protoss', 	150, 	150, 	43, 	600, 	600, 	1),
('Templar Archives', 	'Protoss', 	150, 	200, 	36, 	500, 	500, 	1),
('Dark Shrine', 		'Protoss', 	150, 	150, 	71, 	500, 	500, 	1),
('Robotics Bay', 		'Protoss', 	200, 	200, 	46, 	500, 	500, 	1),
('Fleet Beacon',	 	'Protoss', 	300, 	200, 	43, 	500, 	500, 	1),
('Command Center',	 	'Terran', 	400, 	0, 		71, 	1500, 	NULL, 	1),
('Orbital Command',	 	'Terran', 	150, 	0,	 	25, 	1500, 	NULL, 	1),
('Planetary Fortress', 	'Terran', 	150, 	150, 	36, 	1500, 	NULL, 	3),
('Supply Depot',	 	'Terran', 	100, 	0,	 	21, 	400, 	NULL, 	1),
('Refinery',		 	'Terran', 	75, 	0, 		21, 	500, 	NULL, 	1),
('Barracks',		 	'Terran', 	150, 	0, 		46, 	1000, 	NULL, 	1),
('Engineering Bay',	 	'Terran', 	125, 	0, 		25, 	850, 	NULL, 	1),
('Bunker',			 	'Terran', 	100, 	0, 		29, 	400, 	NULL, 	1),
('Missile Turret',	 	'Terran', 	100, 	0, 		18, 	250, 	NULL, 	0),
('Sensor Tower',	 	'Terran', 	125, 	100, 	18, 	200, 	NULL, 	0),
('Factory',			 	'Terran', 	150, 	100, 	43, 	1250, 	NULL, 	1),
('Ghost Academy',	 	'Terran', 	150, 	50, 	29, 	1250, 	NULL, 	1),
('Armory',	 			'Terran', 	150, 	100, 	46, 	750, 	NULL, 	1),
('Starport',	 		'Terran', 	150, 	100, 	36, 	1300, 	NULL, 	1),
('Fusion Core',		 	'Terran', 	150, 	150, 	46, 	750, 	NULL, 	1),
('Tech Lab',		 	'Terran', 	50, 	25, 	18, 	400, 	NULL, 	1),
('Reactor',			 	'Terran', 	50, 	50, 	36, 	400, 	NULL, 	1),
('Hatchery',		 	'Zerg', 	300, 	0,	 	71, 	1500, 	NULL, 	1),
('Extractor',		 	'Zerg', 	25, 	0, 		21, 	500, 	NULL, 	1),
('Spawning Pool',	 	'Zerg', 	200, 	0, 		46, 	1000, 	NULL, 	1),
('Evolution Chamber', 	'Zerg', 	75, 	0, 		25, 	750, 	NULL, 	1),
('Spine Crawler',	 	'Zerg', 	100, 	0, 		36, 	300, 	NULL, 	2),
('Spore Crawler',	 	'Zerg', 	75, 	0, 		21, 	400, 	NULL, 	1),
('Roach Warren',	 	'Zerg', 	150, 	0, 		39, 	850, 	NULL, 	1),
('Baneling Nest',	 	'Zerg', 	100, 	50, 	43, 	850, 	NULL, 	1),
('Lair',			 	'Zerg', 	150, 	100, 	57, 	2000, 	NULL, 	1),
('Hydralisk Den',	 	'Zerg', 	100, 	100, 	29, 	850, 	NULL, 	1),
('Lurker Den',		 	'Zerg', 	150, 	150, 	86, 	850, 	NULL, 	1),
('Infestation Pit',	 	'Zerg', 	100, 	100, 	36, 	850, 	NULL, 	1),
('Spire',			 	'Zerg', 	200, 	200, 	71, 	850, 	NULL, 	1),
('Nydus Network',	 	'Zerg', 	150, 	200, 	36, 	850, 	NULL, 	1),
('Hive',			 	'Zerg', 	200, 	150, 	71, 	2500, 	NULL, 	1),
('Ultralisk Cavern', 	'Zerg', 	150, 	200, 	46, 	850, 	NULL, 	1),
('Greater Spire',	 	'Zerg', 	100, 	150, 	71, 	1000, 	NULL, 	1),
('Creep Tumor',		 	'Zerg', 	0,	 	0,	 	11, 	50, 	NULL, 	0);
UNLOCK TABLES;

/* Final Project Query for Unit Insert */

LOCK TABLES `unit` WRITE;
INSERT INTO `unit` (unit_name, race, mineral_cost, vespene_cost, build_time, life, shields, armor) VALUES
('Probe', 			 	'Protoss', 	50, 	0, 		17, 	20, 	20, 	0),
('Zealot', 			 	'Protoss', 	100, 	0, 		38, 	100, 	50, 	1),
('Stalker', 		 	'Protoss', 	125, 	50, 	42, 	80, 	80, 	1),
('Sentry', 		 		'Protoss', 	50, 	100,	37, 	40, 	40, 	1),
('Observer', 			'Protoss', 	25, 	75, 	30, 	40, 	20, 	0),
('Immortal', 	 		'Protoss', 	250, 	100,	55, 	200, 	100, 	1),
('Warp Prism', 		 	'Protoss', 	200,	0, 		50,		100, 	100, 	0),
('Colossus', 			'Protoss', 	300, 	200,	75, 	200, 	150, 	1),
('Phoenix', 			'Protoss', 	150, 	100, 	35, 	120, 	60, 	0),
('Void Ray', 			'Protoss', 	250, 	150, 	60, 	150, 	100, 	0),
('High Templar', 		'Protoss', 	50, 	150, 	55, 	40, 	40, 	0),
('Dark Templar', 		'Protoss', 	125, 	125, 	55, 	40, 	80, 	1),
('Archon', 				'Protoss', 	0, 		0,	 	12, 	10, 	350, 	0),
('Carrier', 			'Protoss', 	350, 	250, 	120, 	250, 	150, 	2),
('Mothership',	 		'Protoss', 	300, 	300, 	100, 	350, 	350, 	2),
('Mothership Core', 	'Protoss', 	100, 	100, 	30, 	130, 	60, 	1),
('Oracle', 				'Protoss', 	150, 	150, 	50, 	100, 	60, 	0),
('Tempest',	 			'Protoss', 	300, 	200, 	60, 	300, 	150, 	2),
('Adept', 				'Protoss', 	100, 	25, 	38, 	80, 	70, 	1),
('Disruptor', 			'Protoss', 	150, 	150, 	50, 	100, 	100, 	1),
('SCV',				 	'Terran', 	50, 	0, 		17, 	45, 	NULL, 	0),
('Marine',			 	'Terran', 	50, 	0,	 	25, 	45, 	NULL, 	0),
('Marauder',		 	'Terran', 	100, 	25, 	30, 	125, 	NULL, 	1),
('Reaper',			 	'Terran', 	50, 	50,	 	45, 	60, 	NULL, 	0),
('Ghost',			 	'Terran', 	200, 	100,	40, 	100, 	NULL, 	0),
('Hellion',			 	'Terran', 	100, 	0, 		30, 	90, 	NULL, 	0),
('Siege Tank',		 	'Terran', 	150, 	125,	45, 	160, 	NULL, 	1),
('Thor',			 	'Terran', 	300, 	200,	60, 	400, 	NULL, 	1),
('Viking',			 	'Terran', 	150, 	75,		42, 	125, 	NULL, 	0),
('Medivac',			 	'Terran', 	100, 	100, 	42, 	150, 	NULL, 	1),
('Raven',			 	'Terran', 	100, 	200, 	60, 	140, 	NULL, 	1),
('Banshee',			 	'Terran', 	150, 	100, 	60, 	140, 	NULL, 	0),
('Battlecruiser',		'Terran', 	400, 	300, 	90, 	550, 	NULL, 	3),
('Hellbat',		 		'Terran', 	100, 	0, 		30, 	135, 	NULL, 	0),
('Widow Mine',		 	'Terran', 	75, 	25,	 	40, 	90, 	NULL, 	0),
('Liberator',		 	'Terran', 	150, 	150, 	60, 	180, 	NULL, 	0),
('Cyclone',			 	'Terran', 	150, 	150, 	32, 	120, 	NULL, 	1),
('Larva',			 	'Zerg', 	0,	 	0,	 	0,	 	25, 	NULL, 	10),
('Drone',		 		'Zerg', 	50, 	0, 		17, 	40, 	NULL, 	0),
('Overlord',	 		'Zerg', 	100, 	0, 		25, 	200, 	NULL, 	0),
('Zergling', 			'Zerg', 	50, 	0, 		24, 	35, 	NULL, 	0),
('Queen',	 			'Zerg', 	150, 	0, 		50, 	175, 	NULL, 	1),
('Hydralisk',	 		'Zerg', 	100, 	50,		33, 	80, 	NULL, 	0),
('Baneling',	 		'Zerg', 	25, 	25,		20, 	30, 	NULL, 	0),
('Overseer',	 		'Zerg', 	50, 	50, 	17, 	200, 	NULL, 	1),
('Roach',			 	'Zerg', 	75, 	25, 	27, 	145, 	NULL, 	1),
('Infestor',		 	'Zerg', 	100, 	150, 	50, 	90, 	NULL, 	0),
('Mutalisk',		 	'Zerg', 	100, 	100, 	33, 	120, 	NULL, 	0),
('Corruptor',	 		'Zerg', 	150, 	100, 	40, 	200, 	NULL, 	2),
('Nydus Worm',		 	'Zerg', 	100, 	100, 	20, 	200, 	NULL, 	1),
('Ultralisk',	 		'Zerg', 	300, 	200, 	55, 	500, 	NULL, 	1),
('Brood Lord',		 	'Zerg', 	150, 	150, 	34, 	225, 	NULL, 	1),
('Swarm Host', 			'Zerg', 	200, 	100, 	40, 	160, 	NULL, 	1),
('Viper',	 			'Zerg', 	100, 	200, 	40, 	150, 	NULL, 	1),
('Ravager',		 		'Zerg', 	25,	 	75,	 	9,	 	120, 	NULL, 	1),
('Lurker', 				'Zerg', 	50, 	100, 	15, 	200, 	NULL, 	1);
UNLOCK TABLES;

/* Final Project Query for Building-Makes-Unit + Unit-Makes-Unit Insert */
LOCK TABLES `player_game_building` WRITE, `player_game_unit` WRITE, `player` READ, `game` READ, `building` READ, `unit` READ;
SET @bid1 = (SELECT building_id FROM `building` WHERE bld_name = 'Nexus');
SET @bid2 = (SELECT building_id FROM `building` WHERE bld_name = 'Pylon');
SET @bid3 = (SELECT building_id FROM `building` WHERE bld_name = 'Assimilator');
SET @bid4 = (SELECT building_id FROM `building` WHERE bld_name = 'Gateway');
SET @bid5 = (SELECT building_id FROM `building` WHERE bld_name = 'Forge');
SET @bid6 = (SELECT building_id FROM `building` WHERE bld_name = 'Photon Cannon');
SET @bid7 = (SELECT building_id FROM `building` WHERE bld_name = 'Warpgate');
SET @bid8 = (SELECT building_id FROM `building` WHERE bld_name = 'Cybernetics Core');
SET @bid9 = (SELECT building_id FROM `building` WHERE bld_name = 'Twilight Council');
SET @bid10 = (SELECT building_id FROM `building` WHERE bld_name = 'Robotics Facility');
SET @bid11 = (SELECT building_id FROM `building` WHERE bld_name = 'Stargate');
SET @bid12 = (SELECT building_id FROM `building` WHERE bld_name = 'Templar Archives');
SET @bid13 = (SELECT building_id FROM `building` WHERE bld_name = 'Dark Shrine');
SET @bid14 = (SELECT building_id FROM `building` WHERE bld_name = 'Robotics Bay');
SET @bid15 = (SELECT building_id FROM `building` WHERE bld_name = 'Fleet Beacon');
SET @bid16 = (SELECT building_id FROM `building` WHERE bld_name = 'Command Center');
SET @bid17 = (SELECT building_id FROM `building` WHERE bld_name = 'Orbital Command');
SET @bid18 = (SELECT building_id FROM `building` WHERE bld_name = 'Planetary Fortress');
SET @bid19 = (SELECT building_id FROM `building` WHERE bld_name = 'Supply Depot');
SET @bid20 = (SELECT building_id FROM `building` WHERE bld_name = 'Refinery');
SET @bid21 = (SELECT building_id FROM `building` WHERE bld_name = 'Barracks');
SET @bid22 = (SELECT building_id FROM `building` WHERE bld_name = 'Engineering Bay');
SET @bid23 = (SELECT building_id FROM `building` WHERE bld_name = 'Bunker');
SET @bid24 = (SELECT building_id FROM `building` WHERE bld_name = 'Missile Turret');
SET @bid25 = (SELECT building_id FROM `building` WHERE bld_name = 'Sensor Tower');
SET @bid26 = (SELECT building_id FROM `building` WHERE bld_name = 'Factory');
SET @bid27 = (SELECT building_id FROM `building` WHERE bld_name = 'Ghost Academy');
SET @bid28 = (SELECT building_id FROM `building` WHERE bld_name = 'Armory');
SET @bid29 = (SELECT building_id FROM `building` WHERE bld_name = 'Starport');
SET @bid30 = (SELECT building_id FROM `building` WHERE bld_name = 'Fusion Core');
SET @bid31 = (SELECT building_id FROM `building` WHERE bld_name = 'Tech Lab');
SET @bid32 = (SELECT building_id FROM `building` WHERE bld_name = 'Reactor');
SET @bid33 = (SELECT building_id FROM `building` WHERE bld_name = 'Hatchery');
SET @bid34 = (SELECT building_id FROM `building` WHERE bld_name = 'Extractor');
SET @bid35 = (SELECT building_id FROM `building` WHERE bld_name = 'Spawning Pool');
SET @bid36 = (SELECT building_id FROM `building` WHERE bld_name = 'Evolution Chamber');
SET @bid37 = (SELECT building_id FROM `building` WHERE bld_name = 'Spine Crawler');
SET @bid38 = (SELECT building_id FROM `building` WHERE bld_name = 'Spore Crawler');
SET @bid39 = (SELECT building_id FROM `building` WHERE bld_name = 'Roach Warren');
SET @bid40 = (SELECT building_id FROM `building` WHERE bld_name = 'Baneling Nest');
SET @bid41 = (SELECT building_id FROM `building` WHERE bld_name = 'Lair');
SET @bid42 = (SELECT building_id FROM `building` WHERE bld_name = 'Hydralisk Den');
SET @bid43 = (SELECT building_id FROM `building` WHERE bld_name = 'Lurker Den');
SET @bid44 = (SELECT building_id FROM `building` WHERE bld_name = 'Infestation Pit');
SET @bid45 = (SELECT building_id FROM `building` WHERE bld_name = 'Spire');
SET @bid46 = (SELECT building_id FROM `building` WHERE bld_name = 'Nydus Network');
SET @bid47 = (SELECT building_id FROM `building` WHERE bld_name = 'Hive');
SET @bid48 = (SELECT building_id FROM `building` WHERE bld_name = 'Ultralisk Cavern');
SET @bid49 = (SELECT building_id FROM `building` WHERE bld_name = 'Greater Spire');
SET @bid50 = (SELECT building_id FROM `building` WHERE bld_name = 'Creep Tumor');
SET @uid1 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Probe');
SET @uid2 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Zealot');
SET @uid3 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Stalker');
SET @uid4 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Sentry');
SET @uid5 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Observer');
SET @uid6 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Immortal');
SET @uid7 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Warp Prism');
SET @uid8 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Colossus');
SET @uid9 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Phoenix');
SET @uid10 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Void Ray');
SET @uid11 = (SELECT unit_id FROM `unit` WHERE unit_name = 'High Templar');
SET @uid12 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Dark Templar');
SET @uid13 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Archon');
SET @uid14 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Carrier');
SET @uid15 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Mothership');
SET @uid16 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Mothership Core');
SET @uid17 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Oracle');
SET @uid18 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Tempest');
SET @uid19 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Adept');
SET @uid20 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Disruptor');
SET @uid21 = (SELECT unit_id FROM `unit` WHERE unit_name = 'SCV');
SET @uid22 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Marine');
SET @uid23 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Marauder');
SET @uid24 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Reaper');
SET @uid25 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Ghost');
SET @uid26 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Hellion');
SET @uid27 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Siege Tank');
SET @uid28 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Thor');
SET @uid29 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Viking');
SET @uid30 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Medivac');
SET @uid31 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Raven');
SET @uid32 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Banshee');
SET @uid33 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Battlecruiser');
SET @uid34 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Hellbat');
SET @uid35 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Widow Mine');
SET @uid36 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Liberator');
SET @uid37 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Cyclone');
SET @uid38 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Larva');
SET @uid39 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Drone');
SET @uid40 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Overlord');
SET @uid41 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Zergling');
SET @uid42 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Queen');
SET @uid43 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Hydralisk');
SET @uid44 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Baneling');
SET @uid45 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Overseer');
SET @uid46 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Roach');
SET @uid47 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Infestor');
SET @uid48 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Mutalisk');
SET @uid49 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Corruptor');
SET @uid50 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Nydus Worm');
SET @uid51 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Ultralisk');
SET @uid52 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Brood Lord');
SET @uid53 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Swarm Host');
SET @uid54 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Viper');
SET @uid55 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Ravager');
SET @uid56 = (SELECT unit_id FROM `unit` WHERE unit_name = 'Lurker');
INSERT INTO `player_game_building` VALUES
/* Zerg */
(@gid1, @pid1, @bid33, 3),
(@gid1, @pid1, @bid34, 5),
(@gid1, @pid1, @bid35, 1),
(@gid1, @pid1, @bid36, 1),
(@gid1, @pid1, @bid37, 5),
(@gid1, @pid1, @bid38, 6),
(@gid1, @pid1, @bid39, 1),
(@gid1, @pid1, @bid40, 1),
(@gid1, @pid1, @bid41, 2),
(@gid1, @pid1, @bid47, 1),
(@gid1, @pid1, @bid50, 16),
/* Zerg */
(@gid1, @pid3, @bid33, 4),
(@gid1, @pid3, @bid34, 2),
(@gid1, @pid3, @bid35, 1),
(@gid1, @pid3, @bid36, 1),
(@gid1, @pid3, @bid37, 10),
(@gid1, @pid3, @bid38, 12),
(@gid1, @pid3, @bid39, 1),
(@gid1, @pid3, @bid40, 1),
(@gid1, @pid3, @bid41, 1),
(@gid1, @pid3, @bid43, 1),
(@gid1, @pid3, @bid45, 1),
(@gid1, @pid3, @bid47, 3),
(@gid1, @pid3, @bid49, 1),
/* Zerg */
(@gid1, @pid5, @bid33, 1),
(@gid1, @pid5, @bid34, 1),
(@gid1, @pid5, @bid35, 1),
(@gid1, @pid5, @bid36, 1),
(@gid1, @pid5, @bid37, 2),
(@gid1, @pid5, @bid38, 1),
(@gid1, @pid5, @bid39, 1),
(@gid1, @pid5, @bid40, 1),
/* Zerg */
(@gid1, @pid6, @bid33, 4),
(@gid1, @pid6, @bid34, 5),
(@gid1, @pid6, @bid35, 1),
(@gid1, @pid6, @bid36, 1),
(@gid1, @pid6, @bid37, 5),
(@gid1, @pid6, @bid38, 7),
(@gid1, @pid6, @bid39, 1),
(@gid1, @pid6, @bid40, 1),
(@gid1, @pid6, @bid41, 2),
(@gid1, @pid6, @bid42, 1),
(@gid1, @pid6, @bid43, 1),
(@gid1, @pid6, @bid44, 1),
(@gid1, @pid6, @bid45, 1),
(@gid1, @pid6, @bid46, 1),
(@gid1, @pid6, @bid47, 2),
(@gid1, @pid6, @bid48, 1),
(@gid1, @pid6, @bid49, 2),
(@gid1, @pid6, @bid50, 30),
/* Protoss */
(@gid1, @pid8, @bid1, 1),
(@gid1, @pid8, @bid3, 2),
(@gid1, @pid8, @bid4, 1),
(@gid1, @pid8, @bid9, 1),
/* Protoss */
(@gid1, @pid10, @bid1, 2),
(@gid1, @pid10, @bid2, 3),
(@gid1, @pid10, @bid3, 1),
(@gid1, @pid10, @bid4, 1),
(@gid1, @pid10, @bid5, 1),
(@gid1, @pid10, @bid6, 3),
(@gid1, @pid10, @bid9, 1),
(@gid1, @pid10, @bid13, 1),
/* Protoss */
(@gid1, @pid11, @bid2, 1),
/* Protoss  PID 16, no buildings */
/* Terran */
(@gid2, @pid1, @bid16, 2),
(@gid2, @pid1, @bid18, 1),
(@gid2, @pid1, @bid19, 10),
(@gid2, @pid1, @bid20, 4),
(@gid2, @pid1, @bid21, 1),
(@gid2, @pid1, @bid22, 1),
(@gid2, @pid1, @bid23, 3),
(@gid2, @pid1, @bid24, 4),
(@gid2, @pid1, @bid25, 2),
(@gid2, @pid1, @bid26, 1),
(@gid2, @pid1, @bid27, 1),
(@gid2, @pid1, @bid28, 2),
(@gid2, @pid1, @bid29, 1),
(@gid2, @pid1, @bid30, 2),
(@gid2, @pid1, @bid31, 3),
(@gid2, @pid1, @bid32, 3),
/* Zerg */
(@gid2, @pid2, @bid33, 5),
(@gid2, @pid2, @bid34, 4),
(@gid2, @pid2, @bid35, 1),
(@gid2, @pid2, @bid36, 1),
(@gid2, @pid2, @bid37, 3),
(@gid2, @pid2, @bid38, 2),
(@gid2, @pid2, @bid39, 1),
(@gid2, @pid2, @bid40, 1),
(@gid2, @pid2, @bid41, 1),
(@gid2, @pid2, @bid42, 1),
(@gid2, @pid2, @bid43, 1),
(@gid2, @pid2, @bid45, 1),
(@gid2, @pid2, @bid46, 1),
(@gid2, @pid2, @bid47, 2),
(@gid2, @pid2, @bid49, 1),
/* Zerg */
(@gid2, @pid5, @bid33, 3),
(@gid2, @pid5, @bid34, 6),
(@gid2, @pid5, @bid35, 2),
(@gid2, @pid5, @bid36, 3),
(@gid2, @pid5, @bid37, 5),
(@gid2, @pid5, @bid38, 2),
(@gid2, @pid5, @bid39, 1),
(@gid2, @pid5, @bid40, 1),
(@gid2, @pid5, @bid41, 1),
(@gid2, @pid5, @bid42, 1),
(@gid2, @pid5, @bid43, 1),
(@gid2, @pid5, @bid45, 1),
(@gid2, @pid5, @bid46, 1),
(@gid2, @pid5, @bid47, 2),
(@gid2, @pid5, @bid48, 1),
(@gid2, @pid5, @bid49, 1),
(@gid2, @pid5, @bid50, 22),
/* Terran */
(@gid2, @pid10, @bid16, 4),
(@gid2, @pid10, @bid19, 14),
(@gid2, @pid10, @bid20, 6),
(@gid2, @pid10, @bid21, 1),
(@gid2, @pid10, @bid22, 2),
(@gid2, @pid10, @bid26, 1),
(@gid2, @pid10, @bid27, 1),
(@gid2, @pid10, @bid28, 1),
(@gid2, @pid10, @bid29, 1),
(@gid2, @pid10, @bid30, 1),
(@gid2, @pid10, @bid31, 2),
(@gid2, @pid10, @bid32, 2),
/* Terran */
(@gid2, @pid12, @bid16, 2),
(@gid2, @pid12, @bid17, 1),
(@gid2, @pid12, @bid18, 1),
(@gid2, @pid12, @bid19, 20),
(@gid2, @pid12, @bid20, 3),
(@gid2, @pid12, @bid21, 5),
(@gid2, @pid12, @bid22, 2),
(@gid2, @pid12, @bid23, 1),
(@gid2, @pid12, @bid24, 1),
(@gid2, @pid12, @bid25, 1),
(@gid2, @pid12, @bid26, 6),
(@gid2, @pid12, @bid27, 1),
(@gid2, @pid12, @bid28, 1),
(@gid2, @pid12, @bid29, 3),
(@gid2, @pid12, @bid30, 1),
(@gid2, @pid12, @bid31, 2),
(@gid2, @pid12, @bid32, 2),
/* Protoss */
(@gid2, @pid13, @bid1, 3),
(@gid2, @pid13, @bid2, 16),
(@gid2, @pid13, @bid3, 2),
(@gid2, @pid13, @bid4, 1),
(@gid2, @pid13, @bid5, 2),
(@gid2, @pid13, @bid6, 3),
(@gid2, @pid13, @bid7, 8),
(@gid2, @pid13, @bid8, 2),
(@gid2, @pid13, @bid9, 1),
(@gid2, @pid13, @bid10, 1),
(@gid2, @pid13, @bid11, 1),
(@gid2, @pid13, @bid12, 1),
(@gid2, @pid13, @bid13, 1),
(@gid2, @pid13, @bid14, 1),
(@gid2, @pid13, @bid15, 1),
/* Terran */
(@gid2, @pid14, @bid16, 1),
(@gid2, @pid14, @bid17, 1),
(@gid2, @pid14, @bid18, 1),
(@gid2, @pid14, @bid19, 11),
(@gid2, @pid14, @bid20, 1),
(@gid2, @pid14, @bid21, 2),
(@gid2, @pid14, @bid22, 2),
(@gid2, @pid14, @bid26, 1),
(@gid2, @pid14, @bid28, 1),
(@gid2, @pid14, @bid29, 2),
(@gid2, @pid14, @bid30, 1),
/* Protoss */
(@gid2, @pid15, @bid1, 4),
(@gid2, @pid15, @bid2, 25),
(@gid2, @pid15, @bid3, 4),
(@gid2, @pid15, @bid4, 3),
(@gid2, @pid15, @bid5, 1),
(@gid2, @pid15, @bid6, 10),
(@gid2, @pid15, @bid7, 4),
(@gid2, @pid15, @bid8, 2),
(@gid2, @pid15, @bid9, 2),
(@gid2, @pid15, @bid10, 1),
(@gid2, @pid15, @bid11, 1),
(@gid2, @pid15, @bid12, 2),
(@gid2, @pid15, @bid13, 2),
/* Terran */
(@gid3, @pid5, @bid16, 1),
(@gid3, @pid5, @bid19, 4),
(@gid3, @pid5, @bid20, 1),
(@gid3, @pid5, @bid21, 1),
(@gid3, @pid5, @bid27, 1),
/* Terran */
(@gid3, @pid6, @bid16, 2),
(@gid3, @pid6, @bid19, 2),
(@gid3, @pid6, @bid21, 1),
(@gid3, @pid6, @bid26, 1),
/* Terran */
(@gid3, @pid7, @bid16, 1),
(@gid3, @pid7, @bid19, 2),
(@gid3, @pid7, @bid20, 1),
(@gid3, @pid7, @bid21, 1),
(@gid3, @pid7, @bid29, 1),
(@gid3, @pid7, @bid32, 1),
/* Protoss */
(@gid3, @pid10, @bid1, 1),
(@gid3, @pid10, @bid2, 2),
(@gid3, @pid10, @bid3, 1),
(@gid3, @pid10, @bid7, 2),
/* Protoss */
(@gid3, @pid11, @bid1, 1),
(@gid3, @pid11, @bid2, 2),
(@gid3, @pid11, @bid7, 1),
(@gid3, @pid11, @bid8, 1),
(@gid3, @pid11, @bid13, 1),
/* Protoss */
(@gid3, @pid12, @bid1, 1),
(@gid3, @pid12, @bid2, 2),
(@gid3, @pid12, @bid4, 1),
(@gid3, @pid12, @bid8, 1),
(@gid3, @pid12, @bid11, 1),
/* Zerg */
(@gid4, @pid1, @bid33, 6),
(@gid4, @pid1, @bid34, 4),
(@gid4, @pid1, @bid35, 1),
(@gid4, @pid1, @bid36, 1),
(@gid4, @pid1, @bid37, 15),
(@gid4, @pid1, @bid38, 15),
(@gid4, @pid1, @bid39, 1),
(@gid4, @pid1, @bid41, 1),
(@gid4, @pid1, @bid42, 1),
(@gid4, @pid1, @bid43, 1),
(@gid4, @pid1, @bid46, 1),
(@gid4, @pid1, @bid50, 7),
/* Terran */
(@gid4, @pid3, @bid16, 1),
(@gid4, @pid3, @bid17, 2),
(@gid4, @pid3, @bid19, 18),
(@gid4, @pid3, @bid20, 3),
(@gid4, @pid3, @bid21, 8),
(@gid4, @pid3, @bid22, 3),
(@gid4, @pid3, @bid23, 12),
(@gid4, @pid3, @bid24, 15),
(@gid4, @pid3, @bid25, 3),
(@gid4, @pid3, @bid26, 1),
(@gid4, @pid3, @bid27, 1),
(@gid4, @pid3, @bid31, 4),
(@gid4, @pid3, @bid32, 4),
/* Protoss */
(@gid4, @pid9, @bid1, 5),
(@gid4, @pid9, @bid2, 13),
(@gid4, @pid9, @bid3, 4),
(@gid4, @pid9, @bid4, 2),
(@gid4, @pid9, @bid5, 1),
(@gid4, @pid9, @bid8, 1),
(@gid4, @pid9, @bid10, 4),
(@gid4, @pid9, @bid11, 3),
(@gid4, @pid9, @bid14, 1),
(@gid4, @pid9, @bid15, 2),
/* Terran */
(@gid4, @pid13, @bid18, 5),
(@gid4, @pid13, @bid19, 5),
(@gid4, @pid13, @bid20, 4),
(@gid4, @pid13, @bid21, 2),
(@gid4, @pid13, @bid22, 2),
(@gid4, @pid13, @bid23, 4),
(@gid4, @pid13, @bid24, 20),
(@gid4, @pid13, @bid25, 2),
(@gid4, @pid13, @bid26, 4),
(@gid4, @pid13, @bid28, 4),
(@gid4, @pid13, @bid29, 2),
(@gid4, @pid13, @bid31, 3),
(@gid4, @pid13, @bid32, 3),
/* Protoss */
(@gid4, @pid15, @bid1, 3),
(@gid4, @pid15, @bid2, 20),
(@gid4, @pid15, @bid3, 5),
(@gid4, @pid15, @bid6, 6),
(@gid4, @pid15, @bid7, 10),
(@gid4, @pid15, @bid8, 1),
(@gid4, @pid15, @bid9, 1),
(@gid4, @pid15, @bid12, 1),
(@gid4, @pid15, @bid13, 1),
/* Zerg */
(@gid4, @pid16, @bid33, 4),
(@gid4, @pid16, @bid34, 2),
(@gid4, @pid16, @bid35, 1),
(@gid4, @pid16, @bid36, 1),
(@gid4, @pid16, @bid37, 5),
(@gid4, @pid16, @bid38, 10),
(@gid4, @pid16, @bid42, 1),
(@gid4, @pid16, @bid47, 2),
(@gid4, @pid16, @bid49, 1),
(@gid4, @pid16, @bid50, 15),
/* Terran */
(@gid5, @pid2, @bid19, 10),
(@gid5, @pid2, @bid21, 1),
(@gid5, @pid2, @bid22, 2),
(@gid5, @pid2, @bid23, 3),
/* Protoss */
(@gid5, @pid7, @bid1, 5),
(@gid5, @pid7, @bid2, 25),
(@gid5, @pid7, @bid3, 4),
(@gid5, @pid7, @bid5, 2),
(@gid5, @pid7, @bid6, 2),
(@gid5, @pid7, @bid7, 4),
(@gid5, @pid7, @bid8, 2),
(@gid5, @pid7, @bid9, 1),
(@gid5, @pid7, @bid10, 3),
(@gid5, @pid7, @bid11, 3),
(@gid5, @pid7, @bid12, 1),
(@gid5, @pid7, @bid13, 1),
(@gid5, @pid7, @bid14, 1),
(@gid5, @pid7, @bid15, 2),
/* Zerg */
(@gid5, @pid8, @bid37, 2),
(@gid5, @pid8, @bid38, 2),
(@gid5, @pid8, @bid40, 1),
(@gid5, @pid8, @bid46, 1),
(@gid5, @pid8, @bid50, 5),
/* Zerg */
(@gid5, @pid9, @bid33, 4),
(@gid5, @pid9, @bid34, 5),
(@gid5, @pid9, @bid35, 1),
(@gid5, @pid9, @bid36, 2),
(@gid5, @pid9, @bid37, 3),
(@gid5, @pid9, @bid38, 2),
(@gid5, @pid9, @bid39, 1),
(@gid5, @pid9, @bid41, 2),
(@gid5, @pid9, @bid42, 1),
(@gid5, @pid9, @bid43, 1),
(@gid5, @pid9, @bid44, 1),
(@gid5, @pid9, @bid46, 1),
(@gid5, @pid9, @bid47, 2),
(@gid5, @pid9, @bid48, 2),
(@gid5, @pid9, @bid49, 2),
(@gid5, @pid9, @bid50, 16),
/* Zerg */
(@gid6, @pid4, @bid33, 3),
(@gid6, @pid4, @bid34, 4),
(@gid6, @pid4, @bid35, 1),
(@gid6, @pid4, @bid36, 1),
(@gid6, @pid4, @bid37, 3),
(@gid6, @pid4, @bid38, 2),
(@gid6, @pid4, @bid39, 1),
(@gid6, @pid4, @bid41, 2),
(@gid6, @pid4, @bid42, 1),
(@gid6, @pid4, @bid43, 1),
(@gid6, @pid4, @bid44, 1),
(@gid6, @pid4, @bid47, 2),
(@gid6, @pid4, @bid49, 2),
(@gid6, @pid4, @bid50, 18),
/* Terran */
(@gid6, @pid11, @bid16, 1),
(@gid6, @pid11, @bid17, 2),
(@gid6, @pid11, @bid19, 18),
(@gid6, @pid11, @bid20, 3),
(@gid6, @pid11, @bid21, 3),
(@gid6, @pid11, @bid22, 1),
(@gid6, @pid11, @bid23, 3),
(@gid6, @pid11, @bid24, 2),
(@gid6, @pid11, @bid25, 1),
(@gid6, @pid11, @bid26, 2),
(@gid6, @pid11, @bid27, 1),
(@gid6, @pid11, @bid28, 1),
(@gid6, @pid11, @bid29, 1),
(@gid6, @pid11, @bid30, 1),
(@gid6, @pid11, @bid31, 2),
(@gid6, @pid11, @bid32, 2),
/* Terran */
(@gid6, @pid15, @bid16, 1),
(@gid6, @pid15, @bid17, 1),
(@gid6, @pid15, @bid18, 2),
(@gid6, @pid15, @bid19, 28),
(@gid6, @pid15, @bid20, 2),
(@gid6, @pid15, @bid21, 2),
(@gid6, @pid15, @bid24, 1),
(@gid6, @pid15, @bid26, 2),
(@gid6, @pid15, @bid27, 1),
(@gid6, @pid15, @bid28, 1),
(@gid6, @pid15, @bid29, 4),
(@gid6, @pid15, @bid30, 1),
(@gid6, @pid15, @bid31, 2),
(@gid6, @pid15, @bid32, 2),
/* Protoss */
(@gid6, @pid16, @bid1, 2),
(@gid6, @pid16, @bid2, 10),
(@gid6, @pid16, @bid3, 3),
(@gid6, @pid16, @bid5, 1),
(@gid6, @pid16, @bid7, 2),
(@gid6, @pid16, @bid8, 1),
(@gid6, @pid16, @bid9, 1),
(@gid6, @pid16, @bid10, 1),
(@gid6, @pid16, @bid11, 2),
/* Protoss */
(@gid7, @pid1, @bid1, 2),
(@gid7, @pid1, @bid2, 4),
(@gid7, @pid1, @bid3, 1),
(@gid7, @pid1, @bid5, 1),
(@gid7, @pid1, @bid7, 4),
(@gid7, @pid1, @bid8, 1),
/* Zerg */
(@gid7, @pid7, @bid33, 2),
(@gid7, @pid7, @bid34, 1),
(@gid7, @pid7, @bid35, 1),
(@gid7, @pid7, @bid36, 1),
(@gid7, @pid7, @bid39, 1),
/* Protoss */
(@gid8, @pid1, @bid1, 1),
(@gid8, @pid1, @bid2, 4),
(@gid8, @pid1, @bid3, 1),
(@gid8, @pid1, @bid4, 2),
(@gid8, @pid1, @bid5, 1),
(@gid8, @pid1, @bid7, 2),
(@gid8, @pid1, @bid8, 1),
(@gid8, @pid1, @bid13, 1),
/* Zerg */
(@gid8, @pid7, @bid33, 2),
(@gid8, @pid7, @bid34, 1),
(@gid8, @pid7, @bid35, 1),
(@gid8, @pid7, @bid36, 1),
(@gid8, @pid7, @bid37, 1),
(@gid8, @pid7, @bid39, 1),
(@gid8, @pid7, @bid50, 2),
/* Protoss */
(@gid9, @pid1, @bid1, 1),
(@gid9, @pid1, @bid2, 5),
(@gid9, @pid1, @bid3, 1),
(@gid9, @pid1, @bid4, 1),
(@gid9, @pid1, @bid5, 1),
(@gid9, @pid1, @bid7, 2),
(@gid9, @pid1, @bid8, 1),
(@gid9, @pid1, @bid10, 1),
/* Zerg */
(@gid9, @pid7, @bid33, 2),
(@gid9, @pid7, @bid34, 1),
(@gid9, @pid7, @bid35, 1),
(@gid9, @pid7, @bid36, 1),
(@gid9, @pid7, @bid37, 1),
(@gid9, @pid7, @bid39, 1),
(@gid9, @pid7, @bid40, 1),
(@gid9, @pid7, @bid50, 3),
/* Terran */
(@gid10, @pid9, @bid16, 1),
(@gid10, @pid9, @bid19, 4),
(@gid10, @pid9, @bid20, 1),
(@gid10, @pid9, @bid21, 1),
(@gid10, @pid9, @bid22, 1),
(@gid10, @pid9, @bid26, 1),
/* Terran */
(@gid10, @pid14, @bid16, 1),
(@gid10, @pid14, @bid19, 3),
(@gid10, @pid14, @bid20, 2),
(@gid10, @pid14, @bid21, 2),
(@gid10, @pid14, @bid31, 1),
/* Terran */
(@gid11, @pid9, @bid16, 2),
(@gid11, @pid9, @bid19, 10),
(@gid11, @pid9, @bid20, 1),
(@gid11, @pid9, @bid21, 3),
(@gid11, @pid9, @bid22, 1),
(@gid11, @pid9, @bid26, 1),
(@gid11, @pid9, @bid29, 2),
/* Terran */
(@gid11, @pid14, @bid16, 3),
(@gid11, @pid14, @bid19, 9),
(@gid11, @pid14, @bid20, 2),
(@gid11, @pid14, @bid21, 3),
(@gid11, @pid14, @bid26, 1),
(@gid11, @pid14, @bid27, 1),
(@gid11, @pid14, @bid31, 2),
(@gid11, @pid14, @bid32, 1),
/* Terran */
(@gid12, @pid13, @bid19, 2),
(@gid12, @pid13, @bid25, 1),
/* Zerg */
(@gid12, @pid15, @bid33, 6),
(@gid12, @pid15, @bid35, 1),
(@gid12, @pid15, @bid36, 2),
(@gid12, @pid15, @bid37, 6),
(@gid12, @pid15, @bid38, 6),
(@gid12, @pid15, @bid39, 1),
(@gid12, @pid15, @bid40, 1),
(@gid12, @pid15, @bid41, 2),
(@gid12, @pid15, @bid42, 1),
(@gid12, @pid15, @bid43, 1),
(@gid12, @pid15, @bid44, 1),
(@gid12, @pid15, @bid45, 1),
(@gid12, @pid15, @bid46, 1),
(@gid12, @pid15, @bid47, 2),
(@gid12, @pid15, @bid48, 1),
(@gid12, @pid15, @bid49, 1),
(@gid12, @pid15, @bid50, 43),
/* Protoss */
(@gid13, @pid8, @bid1, 2),
(@gid13, @pid8, @bid2, 10),
(@gid13, @pid8, @bid3, 2),
(@gid13, @pid8, @bid4, 1),
(@gid13, @pid8, @bid5, 1),
(@gid13, @pid8, @bid6, 2),
(@gid13, @pid8, @bid7, 3),
(@gid13, @pid8, @bid10, 2),
(@gid13, @pid8, @bid14, 1),
(@gid13, @pid8, @bid15, 1),
/* Protoss */
(@gid13, @pid16, @bid1, 3),
(@gid13, @pid16, @bid2, 15),
(@gid13, @pid16, @bid3, 4),
(@gid13, @pid16, @bid5, 1),
(@gid13, @pid16, @bid6, 3),
(@gid13, @pid16, @bid7, 4),
(@gid13, @pid16, @bid8, 1),
(@gid13, @pid16, @bid9, 1),
(@gid13, @pid16, @bid10, 2),
(@gid13, @pid16, @bid11, 2),
(@gid13, @pid16, @bid12, 1),
(@gid13, @pid16, @bid13, 1),
(@gid13, @pid16, @bid14, 1),
(@gid13, @pid16, @bid15, 1),
/* Protoss */
(@gid14, @pid11, @bid1, 6),
(@gid14, @pid11, @bid2, 35),
(@gid14, @pid11, @bid3, 5),
(@gid14, @pid11, @bid5, 1),
(@gid14, @pid11, @bid6, 15),
(@gid14, @pid11, @bid7, 6),
(@gid14, @pid11, @bid8, 1),
(@gid14, @pid11, @bid9, 1),
(@gid14, @pid11, @bid10, 3),
(@gid14, @pid11, @bid11, 2),
(@gid14, @pid11, @bid12, 1),
(@gid14, @pid11, @bid13, 1),
(@gid14, @pid11, @bid14, 1),
(@gid14, @pid11, @bid15, 1),
/* Terran */
(@gid14, @pid14, @bid16, 1),
(@gid14, @pid14, @bid19, 2),
(@gid14, @pid14, @bid20, 1),
(@gid14, @pid14, @bid21, 1),
(@gid14, @pid14, @bid31, 1),
(@gid14, @pid14, @bid32, 1),
/* Zerg */
(@gid15, @pid6, @bid33, 8),
(@gid15, @pid6, @bid34, 3),
(@gid15, @pid6, @bid35, 1),
(@gid15, @pid6, @bid36, 1),
(@gid15, @pid6, @bid39, 1),
(@gid15, @pid6, @bid40, 1),
(@gid15, @pid6, @bid41, 1),
(@gid15, @pid6, @bid42, 1),
(@gid15, @pid6, @bid43, 1),
(@gid15, @pid6, @bid44, 1),
(@gid15, @pid6, @bid46, 2),
(@gid15, @pid6, @bid47, 1),
(@gid15, @pid6, @bid49, 1),
(@gid15, @pid6, @bid50, 5),
/* Zerg */
(@gid15, @pid10, @bid33, 5),
(@gid15, @pid10, @bid34, 4),
(@gid15, @pid10, @bid35, 1),
(@gid15, @pid10, @bid36, 1),
(@gid15, @pid10, @bid37, 5),
(@gid15, @pid10, @bid38, 6),
(@gid15, @pid10, @bid39, 1),
(@gid15, @pid10, @bid40, 1),
(@gid15, @pid10, @bid41, 1),
(@gid15, @pid10, @bid44, 1),
(@gid15, @pid10, @bid49, 1),
(@gid15, @pid10, @bid50, 16),
/* Terran */
(@gid16, @pid4, @bid18, 1),
(@gid16, @pid4, @bid19, 4),
(@gid16, @pid4, @bid20, 2),
(@gid16, @pid4, @bid21, 1),
(@gid16, @pid4, @bid22, 1),
(@gid16, @pid4, @bid23, 5),
(@gid16, @pid4, @bid31, 1),
(@gid16, @pid4, @bid32, 1),
/* Zerg */
(@gid16, @pid5, @bid33, 9),
(@gid16, @pid5, @bid34, 8),
(@gid16, @pid5, @bid35, 1),
(@gid16, @pid5, @bid36, 2),
(@gid16, @pid5, @bid37, 19),
(@gid16, @pid5, @bid38, 16),
(@gid16, @pid5, @bid39, 1),
(@gid16, @pid5, @bid40, 1),
(@gid16, @pid5, @bid41, 1),
(@gid16, @pid5, @bid42, 1),
(@gid16, @pid5, @bid43, 1),
(@gid16, @pid5, @bid44, 2),
(@gid16, @pid5, @bid45, 3),
(@gid16, @pid5, @bid46, 3),
(@gid16, @pid5, @bid47, 1),
(@gid16, @pid5, @bid48, 2),
(@gid16, @pid5, @bid49, 4),
(@gid16, @pid5, @bid50, 32);
INSERT INTO `player_game_unit` VALUES
/* Zerg */
(@gid1, @pid1, @uid38, 12),
(@gid1, @pid1, @uid39, 15),
(@gid1, @pid1, @uid40, 3),
(@gid1, @pid1, @uid41, 7),
(@gid1, @pid1, @uid42, 8),
(@gid1, @pid1, @uid47, 3),
(@gid1, @pid1, @uid48, 5),
(@gid1, @pid1, @uid49, 6),
(@gid1, @pid1, @uid52, 1),
(@gid1, @pid1, @uid53, 15),
/* Zerg */
(@gid1, @pid3, @uid38, 50),
(@gid1, @pid3, @uid39, 5),
(@gid1, @pid3, @uid40, 2),
(@gid1, @pid3, @uid41, 50),
(@gid1, @pid3, @uid42, 2),
(@gid1, @pid3, @uid43, 3),
(@gid1, @pid3, @uid44, 2),
(@gid1, @pid3, @uid45, 10),
(@gid1, @pid3, @uid47, 3),
(@gid1, @pid3, @uid48, 20),
(@gid1, @pid3, @uid49, 6),
(@gid1, @pid3, @uid52, 1),
(@gid1, @pid3, @uid53, 15),
(@gid1, @pid3, @uid56, 1),
/* Zerg */
(@gid1, @pid5, @uid38, 5),
(@gid1, @pid5, @uid39, 2),
(@gid1, @pid5, @uid40, 1),
(@gid1, @pid5, @uid41, 2),
(@gid1, @pid5, @uid47, 1),
/* Zerg */
(@gid1, @pid6, @uid38, 30),
(@gid1, @pid6, @uid39, 60),
(@gid1, @pid6, @uid40, 10),
(@gid1, @pid6, @uid41, 20),
(@gid1, @pid6, @uid42, 2),
(@gid1, @pid6, @uid45, 13),
(@gid1, @pid6, @uid46, 3),
(@gid1, @pid6, @uid47, 4),
(@gid1, @pid6, @uid48, 13),
(@gid1, @pid6, @uid49, 2),
(@gid1, @pid6, @uid50, 1),
(@gid1, @pid6, @uid51, 6),
(@gid1, @pid6, @uid55, 4),
(@gid1, @pid6, @uid56, 3),
/* Protoss */
(@gid1, @pid8, @uid1, 3),
(@gid1, @pid8, @uid2, 5),
(@gid1, @pid8, @uid3, 2),
(@gid1, @pid8, @uid5, 1),
/* Protoss */
(@gid1, @pid10, @uid1, 3),
(@gid1, @pid10, @uid2, 5),
(@gid1, @pid10, @uid3, 2),
(@gid1, @pid10, @uid5, 1),
(@gid1, @pid10, @uid12, 2),
(@gid1, @pid10, @uid16, 1),
/* Protoss */
(@gid1, @pid11, @uid2, 15),
(@gid1, @pid11, @uid3, 5),
(@gid1, @pid11, @uid5, 1),
(@gid1, @pid11, @uid6, 1),
(@gid1, @pid11, @uid7, 1),
(@gid1, @pid11, @uid8, 1),
/* Protoss */
(@gid1, @pid16, @uid1, 1),
(@gid1, @pid16, @uid8, 1),
/* Terran */
(@gid2, @pid1, @uid21, 20),
(@gid2, @pid1, @uid22, 30),
(@gid2, @pid1, @uid23, 13),
(@gid2, @pid1, @uid24, 4),
(@gid2, @pid1, @uid25, 2),
(@gid2, @pid1, @uid27, 10),
(@gid2, @pid1, @uid28, 2),
(@gid2, @pid1, @uid29, 5),
(@gid2, @pid1, @uid30, 3),
(@gid2, @pid1, @uid31, 2),
(@gid2, @pid1, @uid33, 4),
(@gid2, @pid1, @uid35, 2),
(@gid2, @pid1, @uid36, 1),
(@gid2, @pid1, @uid37, 1),
/* Zerg */
(@gid2, @pid2, @uid38, 5),
(@gid2, @pid2, @uid39, 35),
(@gid2, @pid2, @uid40, 20),
(@gid2, @pid2, @uid41, 35),
(@gid2, @pid2, @uid42, 4),
(@gid2, @pid2, @uid43, 3),
(@gid2, @pid2, @uid44, 2),
(@gid2, @pid2, @uid45, 10),
(@gid2, @pid2, @uid46, 15),
(@gid2, @pid2, @uid47, 1),
(@gid2, @pid2, @uid48, 12),
(@gid2, @pid2, @uid49, 6),
(@gid2, @pid2, @uid50, 2),
(@gid2, @pid2, @uid52, 1),
(@gid2, @pid2, @uid53, 2),
(@gid2, @pid2, @uid54, 2),
(@gid2, @pid2, @uid55, 4),
(@gid2, @pid2, @uid56, 1),
/* Zerg */
(@gid2, @pid5, @uid39, 43),
(@gid2, @pid5, @uid40, 12),
(@gid2, @pid5, @uid45, 5),
(@gid2, @pid5, @uid48, 60),
(@gid2, @pid5, @uid49, 10),
(@gid2, @pid5, @uid52, 5),
/* Terran */
(@gid2, @pid10, @uid21, 30),
(@gid2, @pid10, @uid22, 25),
(@gid2, @pid10, @uid23, 8),
(@gid2, @pid10, @uid27, 15),
(@gid2, @pid10, @uid28, 1),
(@gid2, @pid10, @uid30, 3),
(@gid2, @pid10, @uid31, 2),
(@gid2, @pid10, @uid33, 6),
/* Terran */
(@gid2, @pid12, @uid21, 75),
(@gid2, @pid12, @uid22, 65),
(@gid2, @pid12, @uid23, 8),
(@gid2, @pid12, @uid24, 1),
(@gid2, @pid12, @uid26, 1),
(@gid2, @pid12, @uid27, 3),
(@gid2, @pid12, @uid28, 1),
(@gid2, @pid12, @uid30, 1),
(@gid2, @pid12, @uid31, 1),
(@gid2, @pid12, @uid36, 3),
(@gid2, @pid12, @uid37, 4),
/* Protoss */
(@gid2, @pid13, @uid1, 52),
(@gid2, @pid13, @uid2, 15),
(@gid2, @pid13, @uid3, 16),
(@gid2, @pid13, @uid4, 2),
(@gid2, @pid13, @uid5, 2),
(@gid2, @pid13, @uid6, 5),
(@gid2, @pid13, @uid8, 2),
(@gid2, @pid13, @uid9, 16),
(@gid2, @pid13, @uid14, 1),
(@gid2, @pid13, @uid15, 1),
/* Terran */
(@gid2, @pid14, @uid21, 32),
(@gid2, @pid14, @uid22, 10),
(@gid2, @pid14, @uid23, 8),
(@gid2, @pid14, @uid24, 1),
(@gid2, @pid14, @uid25, 6),
(@gid2, @pid14, @uid26, 1),
(@gid2, @pid14, @uid27, 3),
(@gid2, @pid14, @uid28, 2),
(@gid2, @pid14, @uid29, 16),
(@gid2, @pid14, @uid30, 5),
(@gid2, @pid14, @uid31, 2),
(@gid2, @pid14, @uid33, 3),
(@gid2, @pid14, @uid34, 2),
/* Protoss */
(@gid2, @pid15, @uid1, 45),
(@gid2, @pid15, @uid2, 4),
(@gid2, @pid15, @uid3, 2),
(@gid2, @pid15, @uid4, 2),
(@gid2, @pid15, @uid5, 2),
(@gid2, @pid15, @uid6, 5),
(@gid2, @pid15, @uid8, 2),
(@gid2, @pid15, @uid9, 16),
(@gid2, @pid15, @uid12, 10),
(@gid2, @pid15, @uid13, 25),
(@gid2, @pid15, @uid14, 1),
(@gid2, @pid15, @uid15, 1),
(@gid2, @pid15, @uid17, 1),
(@gid2, @pid15, @uid18, 4),
(@gid2, @pid15, @uid20, 2),
/* Terran */
(@gid3, @pid5, @uid21, 15),
(@gid3, @pid5, @uid22, 5),
(@gid3, @pid5, @uid25, 2),
/* Terran */
(@gid3, @pid6, @uid21, 20),
(@gid3, @pid6, @uid22, 2),
(@gid3, @pid6, @uid26, 1),
/* Terran */
(@gid3, @pid7, @uid21, 12),
(@gid3, @pid7, @uid22, 2),
(@gid3, @pid7, @uid32, 2),
/* Protoss */
(@gid3, @pid10, @uid1, 12),
(@gid3, @pid10, @uid2, 8),
/* Protoss */
(@gid3, @pid11, @uid1, 14),
(@gid3, @pid11, @uid12, 3),
/* Protoss */
(@gid3, @pid12, @uid1, 13),
(@gid3, @pid12, @uid2, 2),
(@gid3, @pid12, @uid10, 2),
/* Zerg */
(@gid4, @pid1, @uid38, 30),
(@gid4, @pid1, @uid39, 67),
(@gid4, @pid1, @uid40, 14),
(@gid4, @pid1, @uid41, 20),
(@gid4, @pid1, @uid42, 4),
(@gid4, @pid1, @uid45, 3),
(@gid4, @pid1, @uid46, 20),
(@gid4, @pid1, @uid56, 20),
/* Terran */
(@gid4, @pid3, @uid21, 25),
(@gid4, @pid3, @uid22, 70),
(@gid4, @pid3, @uid23, 35),
(@gid4, @pid3, @uid25, 6),
(@gid4, @pid3, @uid30, 5),
/* Protoss */
(@gid4, @pid9, @uid1, 60),
(@gid4, @pid9, @uid2, 6),
(@gid4, @pid9, @uid3, 3),
(@gid4, @pid9, @uid4, 1),
(@gid4, @pid9, @uid6, 3),
(@gid4, @pid9, @uid7, 2),
(@gid4, @pid9, @uid8, 4),
(@gid4, @pid9, @uid9, 10),
(@gid4, @pid9, @uid10, 6),
(@gid4, @pid9, @uid15, 1),
(@gid4, @pid9, @uid17, 4),
(@gid4, @pid9, @uid18, 2),
(@gid4, @pid9, @uid20, 2),
/* Terran */
(@gid4, @pid13, @uid21, 100),
(@gid4, @pid13, @uid27, 20),
(@gid4, @pid13, @uid28, 4),
(@gid4, @pid13, @uid37, 5),
/* Protoss */
(@gid4, @pid15, @uid1, 25),
(@gid4, @pid15, @uid2, 20),
(@gid4, @pid15, @uid3, 25),
(@gid4, @pid15, @uid11, 4),
(@gid4, @pid15, @uid12, 10),
(@gid4, @pid15, @uid13, 4),
(@gid4, @pid15, @uid19, 20),
/* Zerg */
(@gid4, @pid16, @uid38, 4),
(@gid4, @pid16, @uid39, 35),
(@gid4, @pid16, @uid40, 5),
(@gid4, @pid16, @uid42, 3),
(@gid4, @pid16, @uid43, 20),
(@gid4, @pid16, @uid45, 2),
(@gid4, @pid16, @uid48, 30),
(@gid4, @pid16, @uid49, 4),
(@gid4, @pid16, @uid54, 4),
/* Terran */
(@gid5, @pid2, @uid21, 5),
(@gid5, @pid2, @uid22, 10),
(@gid5, @pid2, @uid34, 5),
(@gid5, @pid2, @uid36, 4),
/* Protoss */
(@gid5, @pid7, @uid1, 48),
(@gid5, @pid7, @uid2, 10),
(@gid5, @pid7, @uid3, 12),
(@gid5, @pid7, @uid4, 2),
(@gid5, @pid7, @uid5, 3),
(@gid5, @pid7, @uid7, 2),
(@gid5, @pid7, @uid8, 1),
(@gid5, @pid7, @uid11, 2),
(@gid5, @pid7, @uid13, 2),
(@gid5, @pid7, @uid14, 4),
(@gid5, @pid7, @uid15, 2),
(@gid5, @pid7, @uid16, 3),
(@gid5, @pid7, @uid18, 2),
(@gid5, @pid7, @uid20, 4),
/* Zerg */
(@gid5, @pid8, @uid38, 2),
(@gid5, @pid8, @uid39, 6),
(@gid5, @pid8, @uid40, 2),
(@gid5, @pid8, @uid41, 10),
(@gid5, @pid8, @uid42, 2),
(@gid5, @pid8, @uid50, 1),
/* Zerg */
(@gid5, @pid9, @uid38, 15),
(@gid5, @pid9, @uid39, 34),
(@gid5, @pid9, @uid42, 4),
(@gid5, @pid9, @uid48, 15),
(@gid5, @pid9, @uid49, 10),
(@gid5, @pid9, @uid50, 4),
(@gid5, @pid9, @uid51, 10),
(@gid5, @pid9, @uid52, 4),
(@gid5, @pid9, @uid55, 6),
/* Zerg */
(@gid6, @pid4, @uid38, 15),
(@gid6, @pid4, @uid39, 37),
(@gid6, @pid4, @uid40, 15),
(@gid6, @pid4, @uid42, 7),
(@gid6, @pid4, @uid45, 5),
(@gid6, @pid4, @uid47, 5),
(@gid6, @pid4, @uid48, 35),
(@gid6, @pid4, @uid50, 2),
/* Terran */
(@gid6, @pid11, @uid21, 42),
(@gid6, @pid11, @uid22, 20),
(@gid6, @pid11, @uid25, 6),
(@gid6, @pid11, @uid27, 5),
(@gid6, @pid11, @uid29, 8),
(@gid6, @pid11, @uid30, 3),
(@gid6, @pid11, @uid31, 2),
(@gid6, @pid11, @uid32, 8),
(@gid6, @pid11, @uid33, 2),
(@gid6, @pid11, @uid36, 10),
/* Terran */
(@gid6, @pid15, @uid21, 55),
(@gid6, @pid15, @uid22, 10),
(@gid6, @pid15, @uid29, 40),
(@gid6, @pid15, @uid36, 5),
(@gid6, @pid15, @uid37, 6),
/* Protoss */
(@gid6, @pid16, @uid1, 29),
(@gid6, @pid16, @uid2, 10),
(@gid6, @pid16, @uid3, 25),
(@gid6, @pid16, @uid4, 2),
(@gid6, @pid16, @uid9, 10),
(@gid6, @pid16, @uid10, 5),
(@gid6, @pid16, @uid17, 2),
/* Protoss */
(@gid7, @pid1, @uid1, 16),
(@gid7, @pid1, @uid2, 2),
(@gid7, @pid1, @uid3, 4),
(@gid7, @pid1, @uid4, 1),
/* Zerg */
(@gid7, @pid7, @uid38, 1),
(@gid7, @pid7, @uid39, 15),
(@gid7, @pid7, @uid40, 3),
(@gid7, @pid7, @uid41, 12),
(@gid7, @pid7, @uid42, 2),
(@gid7, @pid7, @uid46, 2),
/* Protoss */
(@gid8, @pid1, @uid1, 15),
(@gid8, @pid1, @uid2, 2),
(@gid8, @pid1, @uid3, 2),
(@gid8, @pid1, @uid4, 1),
(@gid8, @pid1, @uid12, 2),
/* Zerg */
(@gid8, @pid7, @uid38, 1),
(@gid8, @pid7, @uid39, 15),
(@gid8, @pid7, @uid40, 3),
(@gid8, @pid7, @uid41, 10),
(@gid8, @pid7, @uid42, 2),
(@gid8, @pid7, @uid46, 5),
/* Protoss */
(@gid9, @pid1, @uid1, 17),
(@gid9, @pid1, @uid2, 2),
(@gid9, @pid1, @uid3, 2),
(@gid9, @pid1, @uid4, 1),
(@gid9, @pid1, @uid6, 1),
/* Zerg */
(@gid9, @pid7, @uid38, 1),
(@gid9, @pid7, @uid39, 16),
(@gid9, @pid7, @uid40, 3),
(@gid9, @pid7, @uid41, 8),
(@gid9, @pid7, @uid42, 1),
(@gid9, @pid7, @uid44, 4),
(@gid9, @pid7, @uid46, 5),
/* Terran */
(@gid10, @pid9, @uid21, 14),
(@gid10, @pid9, @uid22, 10),
(@gid10, @pid9, @uid23, 2),
(@gid10, @pid9, @uid26, 2),
/* Terran */
(@gid10, @pid14, @uid21, 15),
(@gid10, @pid14, @uid22, 2),
(@gid10, @pid14, @uid24, 8),
/* Terran */
(@gid11, @pid9, @uid21, 32),
(@gid11, @pid9, @uid22, 20),
(@gid11, @pid9, @uid23, 2),
(@gid11, @pid9, @uid26, 2),
(@gid11, @pid9, @uid29, 2),
(@gid11, @pid9, @uid32, 4),
/* Terran */
(@gid11, @pid14, @uid21, 28),
(@gid11, @pid14, @uid22, 10),
(@gid11, @pid14, @uid24, 20),
(@gid11, @pid14, @uid25, 4),
(@gid11, @pid14, @uid27, 2),
(@gid11, @pid14, @uid30, 2),
/* Terran */
(@gid12, @pid13, @uid21, 5),
(@gid12, @pid13, @uid22, 2),
/* Zerg */
(@gid12, @pid15, @uid38, 2),
(@gid12, @pid15, @uid39, 60),
(@gid12, @pid15, @uid40, 10),
(@gid12, @pid15, @uid43, 35),
(@gid12, @pid15, @uid45, 8),
(@gid12, @pid15, @uid46, 20),
(@gid12, @pid15, @uid48, 10),
/* Protoss */
(@gid13, @pid8, @uid1, 24),
(@gid13, @pid8, @uid2, 12),
(@gid13, @pid8, @uid3, 7),
(@gid13, @pid8, @uid4, 3),
(@gid13, @pid8, @uid6, 4),
(@gid13, @pid8, @uid14, 1),
/* Protoss */
(@gid13, @pid16, @uid1, 35),
(@gid13, @pid16, @uid2, 20),
(@gid13, @pid16, @uid3, 10),
(@gid13, @pid16, @uid7, 2),
(@gid13, @pid16, @uid8, 4),
(@gid13, @pid16, @uid9, 10),
(@gid13, @pid16, @uid10, 3),
(@gid13, @pid16, @uid13, 4),
(@gid13, @pid16, @uid19, 5),
/* Protoss */
(@gid14, @pid11, @uid1, 55),
(@gid14, @pid11, @uid2, 20),
(@gid14, @pid11, @uid3, 25),
(@gid14, @pid11, @uid6, 2),
(@gid14, @pid11, @uid7, 1),
(@gid14, @pid11, @uid8, 3),
(@gid14, @pid11, @uid12, 5),
(@gid14, @pid11, @uid16, 3),
/* Terran */
(@gid14, @pid14, @uid21, 3),
(@gid14, @pid14, @uid22, 5),
(@gid14, @pid14, @uid27, 3),
(@gid14, @pid14, @uid28, 1),
(@gid14, @pid14, @uid29, 3),
(@gid14, @pid14, @uid35, 2),
/* Zerg */
(@gid15, @pid6, @uid38, 4),
(@gid15, @pid6, @uid39, 23),
(@gid15, @pid6, @uid40, 10),
(@gid15, @pid6, @uid41, 60),
(@gid15, @pid6, @uid42, 10),
(@gid15, @pid6, @uid44, 30),
(@gid15, @pid6, @uid45, 10),
(@gid15, @pid6, @uid50, 4),
(@gid15, @pid6, @uid53, 5),
(@gid15, @pid6, @uid54, 15),
/* Zerg */
(@gid15, @pid10, @uid38, 2),
(@gid15, @pid10, @uid39, 30),
(@gid15, @pid10, @uid40, 6),
(@gid15, @pid10, @uid45, 2),
(@gid15, @pid10, @uid46, 30),
(@gid15, @pid10, @uid47, 3),
(@gid15, @pid10, @uid48, 20),
(@gid15, @pid10, @uid50, 1),
(@gid15, @pid10, @uid51, 1),
/* Terran */
(@gid16, @pid4, @uid21, 12),
(@gid16, @pid4, @uid22, 25),
(@gid16, @pid4, @uid23, 10),
(@gid16, @pid4, @uid30, 2),
(@gid16, @pid4, @uid33, 1),
(@gid16, @pid4, @uid36, 4),
/* Zerg */
(@gid16, @pid5, @uid38, 16),
(@gid16, @pid5, @uid39, 56),
(@gid16, @pid5, @uid40, 15),
(@gid16, @pid5, @uid42, 6),
(@gid16, @pid5, @uid45, 4),
(@gid16, @pid5, @uid50, 4),
(@gid16, @pid5, @uid51, 11),
(@gid16, @pid5, @uid54, 18);
UNLOCK TABLES;