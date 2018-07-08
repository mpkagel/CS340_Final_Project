/*************************************************************
** File Name: gamePlayer.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the player_game entity.
*************************************************************/
module.exports.getPlayerGamesList = function(res, context, id, complete, pool) { // Get all games that a single player participates in.
	var sql = 'SELECT g.game_id, p.player_id, g.map_id, g.game_name, g.game_type, g.game_time, g.date_played, m.map_name ' +
  	'FROM game g ' +
  	'LEFT JOIN map m ON m.map_id = g.map_id ' +
  	'INNER JOIN player_game pg ON pg.game_id = g.game_id ' +
  	'INNER JOIN player p ON p.player_id = pg.player_id ' +
  	'WHERE p.player_id = ' + id +
  	' ORDER BY g.game_name';
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.games = rows;
    	complete();
  	});
}

module.exports.getGamePlayerList = function(res, context, id, complete, pool) { // Get list of players from one game.
	var sql = 'SELECT g.game_id, p.player_id, g.game_type, g.game_name, p.player_name, pg.outcome, pg.race, pg.team ' +
  	'FROM game g ' +
  	'INNER JOIN player_game pg ON pg.game_id = g.game_id ' +
  	'INNER JOIN player p ON p.player_id = pg.player_id ' +
  	'WHERE g.game_id = ' + id +
  	' ORDER BY pg.team';
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.player = rows;
    	complete();
  	});
}

module.exports.deleteOneGamePlayers = function(res, id, complete, pool) { // Delete all players from a game.
	var sql = 'DELETE FROM player_game WHERE game_id = ' + id; 
	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	complete();
	});
}

module.exports.getAllGamePlayerList = function(res, context, count, complete, pool) { // Recursive call. Get all players from all games.
	var gamePlayerHelper = require('./gamePlayer.js');
	if (count == 0) {
		complete();
	} else {
		var sql = 'SELECT g.game_id, p.player_id, g.game_type, g.game_name, p.player_name, pg.outcome, pg.race, pg.team ' +
	  	'FROM game g ' +
	  	'INNER JOIN player_game pg ON pg.game_id = g.game_id ' +
	  	'INNER JOIN player p ON p.player_id = pg.player_id ' +
	  	'WHERE g.game_id = ' + context.games[count - 1].game_id +
	  	' ORDER BY pg.team';
	  	pool.query(sql, function(err, rows, fields) {
		    if(err){
	    	  next(err);
	      	return;
	    	}
	    	context.games[count - 1].player = rows;
	    	gamePlayerHelper.getAllGamePlayerList(res, context, --count, complete, pool);
	  	});
	}	
}

module.exports.deleteOneGamePlayerBldUnit = function(res, gameId, playerId, complete, pool) { // Delete all buildings and units for one player from a single game.
	var sql = 'DELETE FROM player_game_building WHERE player_id = ' + playerId + 
	' AND game_id = ' + gameId;
	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
		var sql2 = 'DELETE FROM player_game_unit WHERE player_id = ' + playerId + 
		' AND game_id = ' + gameId;
		pool.query(sql2, function(err, rows, fields) {
		    if(err){
	    	  next(err);
	      	return;
	    	}
	    	complete();
		});
	});
}

module.exports.route_GET_gamePlayer = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
	var gamePlayerHelper = require('./gamePlayer.js');
	var callbackCount = 0;
  	var context = {};
	context.layout = 'game-player-layout';
	gameHelper.getOneGame(res, context, req.session.game_id, complete, pool);
	gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete, pool);
  	function complete() {
    	callbackCount++;
    	if(callbackCount >= 2) {
    		if (context.game[0].map_name == null) {
    			context.game[0].map_name = 'null';
    		}
    		context.player.forEach( function(e) {
    			if (e.team == 0) {
    				e.team = 1;
    			} else if (e.team == 1) {
    				e.team = 2;
    			} else if (e.team == null) {
    				e.team = 'null';
    			}
    		});
    		context.results = context.game[0].game_name;
    		if (req.session.warning) {
				context.warning = req.session.warning;
				req.session.warning = null;
			}
  			res.render('game-player', context);
    	}
  	}
}

module.exports.route_POST_gamePlayer = function(req, res, pool) {
	var gameHelper = require('./game.js');
	var gamePlayerHelper = require('./gamePlayer.js');
	var playerHelper = require('./player.js');
	context = {};
	if (req.body['Game Id']) {
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}

	if (req.body['GetGamePlayerId']) {
	    res.send(JSON.stringify(req.session.game_id));
	}

	if (req.body['GetGamePlayers']) {
		gamePlayerHelper.getGamePlayerList(res, context, req.body['GetGamePlayers'], complete1, pool);
		function complete1() {
			res.send(context);
		}
	}

	if (req.body['GetAllGamePlayers']) {
		context.games = req.body.games.results;
		gamePlayerHelper.getAllGamePlayerList(res, context, req.body.games.results.length, complete2, pool);		
		function complete2() {
			res.send(context);
		}
	}

	if (req.body['Add Item']) {
		var sql = 'INSERT INTO player_game (game_id, player_id, outcome, race, team) ' +
		'VALUES (?,?,?,?,?)';
		if (req.body.team == 1) {
	        req.body.team = 0;
	    } else if (req.body.team == 2) {
	        req.body.team = 1;
	    } else {
	        req.body.team = null;
	    }
		pool.query(sql,
			[req.session.game_id, req.body.player, req.body.outcome, req.body.race, req.body.team],
		 function(err, result) {
		    if(err){
	    	  	req.session.sqlMessage = err.sqlMessage;
		        res.send(err);
	      		return;
	    	}
	    	var callbackCount = 0;
		  	var context = {};
			context.layout = 'game-player-layout';
			gameHelper.getOneGame(res, context, req.session.game_id, complete3, pool);
			gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete3, pool);
		  	function complete3() {
		    	callbackCount++;
		    	if(callbackCount >= 2) {
		    		if (context.game[0].map_name == null) {
		    			context.game[0].map_name = 'null';
		    		}
		    		context.player.forEach( function(e) {
		    			if (e.team == 0) {
		    				e.team = 1;
		    			} else if (e.team == 1) {
		    				e.team = 2;
		    			} else if (e.team == null) {
		    				e.team = 'null';
		    			}
		    		});
		    		context.results = context.game[0].game_name;
		  			res.render('game-player', context);
		    	}
		  	}
	  	});
    }
    
	if (req.body['Edit Request']) {
		var sql = 'SELECT g.game_id, p.player_id, g.game_name, p.player_name, pg.outcome, pg.race, pg.team ' +
  		'FROM game g ' +
  		'INNER JOIN player_game pg ON pg.game_id = g.game_id ' +
  		'INNER JOIN player p ON p.player_id = pg.player_id ' +
  		'WHERE g.game_id = ? AND p.player_id = ?';
		pool.query(sql, [req.session.game_id, req.session.player_id], function(err, result) {
	        if(err){
	          req.session.sqlMessage = err.sqlMessage;
		      res.send(err);
	          return;
	        }
	        if(result.length == 1){
	          	var curVals = result[0];
	          	if (req.body.team == 1) {
	          		curVals.team = 0;
	          	} else if (req.body.team == 2) {
	          		curVals.team = 1;
	          	} else if (req.body.team == null) {
	          		curVals.team = null;
	          	} else {
	          		curVals.team = null;
	          	}
	          	if (req.body.outcome != "Won" && req.body.outcome != "Lost") {
	          		req.body.outcome = curVals.outcome;
	          	}
	          	pool.query('UPDATE player_game SET game_id=?, player_id=?, outcome=?, race=?, team=? WHERE game_id=? AND player_id=? ',
	            	[req.session.game_id || curVals.game_id, req.body.player || curVals.player_id, req.body.outcome, 
	             	req.body.race || curVals.race, curVals.team, req.session.game_id, req.session.player_id],
	            function(err, result) {
		           	if(err){
		              console.log(err);
		              return;
		            }
					if (req.body.race != curVals.race) {
						gamePlayerHelper.deleteOneGamePlayerBldUnit(res, req.session.game_id, req.session.player_id, complete4, pool); 
						function complete4() {
						  	var callbackCount = 0;
						  	var context = {};
							context.layout = 'game-player-layout';
							gameHelper.getOneGame(res, context, req.session.game_id, complete5, pool);
							playerHelper.getOnePlayer(res, context, req.session.player_id, complete5, pool);
							gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete5, pool);
						  	function complete5() {
						  		callbackCount++;
				    			if(callbackCount >= 3) {
							  		if (context.game[0].map_name == null) {
					    			context.game[0].map_name = 'null';
						    		}
						    		context.player.forEach( function(e) {
						    			if (e.team == 0) {
						    				e.team = 1;
						    			} else if (e.team == 1) {
						    				e.team = 2;
						    			} else if (e.team == null) {
						    				e.team = 'null';
						    			}
						    		});
						    		playerName = context.results[0].player_name;
						    		context.results = context.game[0].game_name;
						    		req.session.warning = 'All buildings and units for ' + playerName + 
						    		' in ' + context.results + ' have been removed due to a player race update!' 
						  			res.render('game-player', context);
						  		}
							}
						}	
					} else {
						var callbackCount = 0;
					  	var context = {};
						context.layout = 'game-player-layout';
						gameHelper.getOneGame(res, context, req.session.game_id, complete6, pool);
						gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete6, pool);
					  	function complete6() {
					    	callbackCount++;
					    	if(callbackCount >= 2) {
					    		if (context.game[0].map_name == null) {
					    			context.game[0].map_name = 'null';
					    		}
					    		context.player.forEach( function(e) {
					    			if (e.team == 0) {
					    				e.team = 1;
					    			} else if (e.team == 1) {
					    				e.team = 2;
					    			} else if (e.team == null) {
					    				e.team = 'null';
					    			}
					    		});
					    		context.results = context.game[0].game_name;
					  			res.render('game-player', context);
					    	}
					  	}
					}
			   	});
			}
		});
    }

    if (req.body['Delete Item']) {
		var sql = 'DELETE FROM player_game WHERE player_id=? AND game_id=?'
		pool.query(sql, [req.body['Delete Item'], req.session.game_id], function(err, result) {
		    if(err){
	    	  	next(err);
	      		return;
	    	}
	    	var callbackCount = 0;
		  	var context = {};
			context.layout = 'game-player-layout';
			gameHelper.getOneGame(res, context, req.session.game_id, complete7, pool);
			gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete7, pool);
		  	function complete7() {
		    	callbackCount++;
		    	if(callbackCount >= 2) {
		    		if (context.game[0].map_name == null) {
		    			context.game[0].map_name = 'null';
		    		}
		    		context.player.forEach( function(e) {
		    			if (e.team == 0) {
		    				e.team = 1;
		    			} else if (e.team == 1) {
		    				e.team = 2;
		    			} else if (e.team == null) {
		    				e.team = 'null';
		    			}
		    		});
		    		context.results = context.game[0].game_name;
		  			res.render('game-player', context);
		    	}
		  	}
	  	});
    }
}

module.exports.route_GET_gamePlayerAdd = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
  	var context = {};
	context.layout = 'game-player-add-layout';
	gameHelper.getOneGame(res, context, req.session.game_id, complete, pool);
  	function complete() {
		if (context.game[0].map_name == null) {
			context.game[0].map_name = 'null';
		}
		if (req.session.sqlMessage) {
			context.warningSql = req.session.sqlMessage;
			req.session.sqlMessage = null;
		}
		context.results = context.game[0].game_name;
		res.render('game-player-add', context);	
  	}
}

module.exports.route_POST_gamePlayerAdd = function(req, res) {
	if (req.body['Game Id']) {
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}
}

module.exports.route_GET_gamePlayerUpdate = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
	var playerHelper = require('./player.js');
	var callbackCount = 0;
  	var context = {};
	context.layout = 'game-player-update-layout';
	gameHelper.getOneGame(res, context, req.session.game_id, complete, pool);
	playerHelper.getOneGamePlayer(res, context, req.session.game_id, req.session.player_id, complete, pool);
  	function complete() {
    	callbackCount++;
    	if(callbackCount >= 2) {
    		if (context.game[0].map_name == null) {
    			context.game[0].map_name = 'null';
    		}
    		context.player.forEach( function(e) {
    			if (e.team == 0) {
    				e.team = 1;
    			} else if (e.team == 1) {
    				e.team = 2;
    			} else if (e.team == null) {
    				e.team = 'null';
    			}
    		});
    		if (req.session.sqlMessage) {
				context.warningSql = req.session.sqlMessage;
				req.session.sqlMessage = null;
			}
    		context.results = context.game[0].game_name;
  			res.render('game-player-update', context);
    	}
  	}
}

module.exports.route_POST_gamePlayerUpdate = function(req, res, pool) {
	var playerHelper = require('./player.js');
	context = {};
	if (req.body['Game Id']) {
		if (req.body['Player Id']) {
			req.session.player_id = req.body['Player Id'];
		}
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}

	if (req.body['GetGamePlayer']) {
	    playerHelper.getOneGamePlayer(res, context, req.session.game_id, req.session.player_id, complete, pool);
	    function complete() {
	    	context.player.forEach( function(e) {
    			if (e.team == 0) {
    				e.team = 1;
    			} else if (e.team == 1) {
    				e.team = 2;
    			} else if (e.team == null) {
    				e.team = 'null';
    			}
    		});
	    	if (req.session.sqlMessage) {
				context.warningSql = req.session.sqlMessage;
				req.session.sqlMessage = null;
			}
		  	res.send(context);	
	    }  	
	}
}

module.exports.route_GET_gamePlayerBldUnit = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
	var gamePlayerHelper = require('./gamePlayer.js');
	var gamePlayerBuildingHelper = require('./gamePlayerBuilding.js');
	var gamePlayerUnitHelper = require('./gamePlayerUnit.js');
	var callbackCount = 0;
	var subcallbackCount = 0;
  	var context = {};
	context.layout = 'game-player-bldunit-layout';
	gameHelper.getOneGame(res, context, req.session.game_id, subComplete, pool);
	gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, subComplete, pool);
	function subComplete () {
		subcallbackCount++;
		if (subcallbackCount >= 2) {
			gamePlayerBuildingHelper.getGamePlayerBldList(res, context, req.session.game_id, context.player.length, complete, pool); // Recursive call.
			gamePlayerUnitHelper.getGamePlayerUnitList(res, context, req.session.game_id, context.player.length, complete, pool); // Recursive call.
		  	function complete() {
		    	callbackCount++;
		    	if(callbackCount >= 2) {
		    		if (context.game[0].map_name == null) {
		    			context.game[0].map_name = 'null';
		    		}
		    		context.player.forEach( function(e) {
		    			if (e.team == 0) {
		    				e.team = 1;
		    			} else if (e.team == 1) {
		    				e.team = 2;
		    			} else if (e.team == null) {
		    				e.team = 'null';
		    			}
		    		});
		    		context.results = context.game[0].game_name;
		  			res.render('game-player-bldunit', context);
		    	}
		  	}
		}
	}
}

module.exports.route_POST_gamePlayerBldUnit = function(req, res, pool) {
	var gamePlayerBuildingHelper = require('./gamePlayerBuilding.js');
	var gamePlayerUnitHelper = require('./gamePlayerUnit.js');
	var playerHelper = require('./player.js');
	var buildingHelper = require('./building.js');
	var unitHelper = require('./unit.js');
	var gameHelper = require('./game.js');
	var gamePlayerHelper = require('./gamePlayer.js');
	context = {};
	if (req.body['Game Id']) {
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}

	if (req.body['GetGamePlayerBld']) {
		gamePlayerBuildingHelper.getOneGamePlayerBldList(res, context, req.body.game_id, req.body.player_id, complete1, pool);
		function complete1() {
			res.send(context);
		}
	}

	if (req.body['GetGamePlayerUnit']) {
		gamePlayerUnitHelper.getOneGamePlayerUnitList(res, context, req.body.game_id, req.body.player_id, complete2, pool);
		function complete2() {
			res.send(context);
		}
	}

	if (req.body['Edit Building']) {
		playerHelper.getOneGamePlayer(res, context, req.session.game_id, req.session.player_id, complete3, pool);
		function complete3() {
			buildingHelper.getBuilding(res, context, complete4, 'Race', context.player[0].race, 'None', pool);
			function complete4() {
				gamePlayerBuildingHelper.getOneGamePlayerBldList(res, context, req.session.game_id, req.session.player_id, complete5, pool);
				function complete5() {
					var newList = [];
					context.results.forEach( function(e, i) {
						newList[e.building_id] = req.body.quantity[i];
					});	
					context.newList = newList;
					var currentList = [];
					context.building.forEach( function(e) {
						currentList[e.building_id] = e.quantity; 
					});
					context.currentList = currentList;
					context.buildingList = context.results;
					gamePlayerBuildingHelper.editBldList(res, context, req.session.game_id, req.session.player_id, context.buildingList.length, complete6, pool);
					function complete6() {
						var callbackCount = 0;
						var subcallbackCount = 0;
					  	context = {};
						context.layout = 'game-player-bldunit-layout';
						gameHelper.getOneGame(res, context, req.session.game_id, complete7, pool);
						gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete7, pool);
						function complete7() {
							subcallbackCount++;
							if (subcallbackCount >= 2) {
								gamePlayerBuildingHelper.getGamePlayerBldList(res, context, req.session.game_id, context.player.length, complete8, pool); // Recursive call.
								gamePlayerUnitHelper.getGamePlayerUnitList(res, context, req.session.game_id, context.player.length, complete8, pool); // Recursive call.
							  	function complete8() {
							    	callbackCount++;
							    	if(callbackCount >= 2) {
							    		if (context.game[0].map_name == null) {
							    			context.game[0].map_name = 'null';
							    		}
							    		context.player.forEach( function(e) {
							    			if (e.team == 0) {
							    				e.team = 1;
							    			} else if (e.team == 1) {
							    				e.team = 2;
							    			} else if (e.team == null) {
							    				e.team = 'null';
							    			}
							    		});
							    		context.results = context.game[0].game_name;
							  			res.render('game-player-bldunit', context);
							    	}
							  	}
							}
						}
					}
				}
			}
		}
    }

    if (req.body['Edit Unit']) {
		playerHelper.getOneGamePlayer(res, context, req.session.game_id, req.session.player_id, complete9, pool);
		function complete9() {
			unitHelper.getUnit(res, context, complete10, 'Race', context.player[0].race, 'None', pool);
			function complete10() {
				gamePlayerUnitHelper.getOneGamePlayerUnitList(res, context, req.session.game_id, req.session.player_id, complete11, pool);
				function complete11() {
					var newList = [];
					context.results.forEach( function(e, i) {
						newList[e.unit_id] = req.body.quantity[i];
					});	
					context.newList = newList;
					var currentList = [];
					context.unit.forEach( function(e) {
						currentList[e.unit_id] = e.quantity; 
					});
					context.currentList = currentList;
					context.unitList = context.results;
					gamePlayerUnitHelper.editUnitList(res, context, req.session.game_id, req.session.player_id, context.unitList.length, complete12, pool);
					function complete12() {
						var callbackCount = 0;
						var subcallbackCount = 0;
					  	context = {};
						context.layout = 'game-player-bldunit-layout';
						gameHelper.getOneGame(res, context, req.session.game_id, complete13, pool);
						gamePlayerHelper.getGamePlayerList(res, context, req.session.game_id, complete13, pool);
						function complete13() {
							subcallbackCount++;
							if (subcallbackCount >= 2) {
								gamePlayerBuildingHelper.getGamePlayerBldList(res, context, req.session.game_id, context.player.length, complete14, pool); // Recursive call.
								gamePlayerUnitHelper.getGamePlayerUnitList(res, context, req.session.game_id, context.player.length, complete14, pool); // Recursive call.
							  	function complete14() {
							    	callbackCount++;
							    	if(callbackCount >= 2) {
							    		if (context.game[0].map_name == null) {
							    			context.game[0].map_name = 'null';
							    		}
							    		context.player.forEach( function(e) {
							    			if (e.team == 0) {
							    				e.team = 1;
							    			} else if (e.team == 1) {
							    				e.team = 2;
							    			} else if (e.team == null) {
							    				e.team = 'null';
							    			}
							    		});
							    		context.results = context.game[0].game_name;
							  			res.render('game-player-bldunit', context);
							    	}
							  	}
							}
						}
					}
				}
			}
		}
    }
}

module.exports.route_GET_playerGame = function(req, res, next, pool) {
	var gamePlayerHelper = require('./gamePlayer.js');
	var playerHelper = require('./player.js');
	var callbackCount = 0;
	var context = {};
	context.layout = 'player-game-layout';
	playerHelper.getOnePlayer(res, context, req.session.player_id, complete, pool);
    gamePlayerHelper.getPlayerGamesList(res, context, req.session.player_id, complete, pool);
    function complete() {
    	callbackCount++;
    	if(callbackCount >= 2) {
    		context.player = context.results;
    		if (context.player[0].team == 0) {
    			context.player[0].team = 1;
    		} else if (context.player[0].team == 1) {
    			context.player[0].team = 2;
    		} else if (context.player[0].text == null) {
				context.player[0].team = 'null';
    		}
    		context.games.forEach( function(e) {
    			if (e.map_name == null) {
    				e.map_name = 'null';
    			}
    		});
    		context.results = context.player[0].player_name;
  			res.render('player-game', context);
    	}
    } 
}

module.exports.route_POST_playerGame = function(req, res, pool) {
	var gamePlayerHelper = require('./gamePlayer.js');
	var context = {};
	if (req.body['Player Id']) {
	    req.session.player_id = req.body['Player Id'];
	    res.end();
	}

	if (req.body['GetPlayerGameId']) {
	    res.send(JSON.stringify(req.session.player_id));
	}

	if (req.body['GetPlayerGames']) {
		gamePlayerHelper.getPlayerGamesList(res, context, req.body['GetPlayerGames'], complete, pool);
		function complete() {
			if (context.games) {
				context.listLength = context.games.length;
			}
			res.send(context);
		}
	}
}
