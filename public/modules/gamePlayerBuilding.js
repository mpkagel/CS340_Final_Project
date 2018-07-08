/*************************************************************
** File Name: gamePlayerBuilding.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the player_game_building entity.
*************************************************************/
module.exports.getGamePlayerBldList = function(res, context, id, count, complete, pool) { // Recursive call, function assumes that getGamePlayerList has been called.
	var gamePlayerBuildingHelper = require('./gamePlayerBuilding.js');
	if (count == 0) { // Get all buildings for all players from a single game.
		complete();
	} else {
		var sql = 'SELECT b.building_id, g.game_id, p.player_id, g.game_name, p.player_name, pg.race, b.bld_name, pgb.quantity ' +
	  	'FROM player_game pg ' +
	  	'INNER JOIN player_game_building pgb ON (pg.game_id = pgb.game_id AND pg.player_id = pgb.player_id) ' +
	  	'INNER JOIN player p ON pg.player_id = p.player_id ' +
	  	'INNER JOIN game g ON pg.game_id = g.game_id ' +
	  	'INNER JOIN building b ON pgb.building_id = b.building_id ' +
	  	'WHERE g.game_id = ' + id + ' AND p.player_id = ' + context.player[count - 1].player_id +
	  	' ORDER BY pg.game_id, pg.player_id, b.building_id';
	  	pool.query(sql, function(err, rows, fields) {
		    if(err){
	    	  next(err);
	      	return;
	    	}
	    	context.player[count -1].building = rows;
	    	gamePlayerBuildingHelper.getGamePlayerBldList(res, context, id, --count, complete, pool);
	  	});
	}	
}

module.exports.getOneGamePlayerBldList = function(res, context, gameId, playerId, complete, pool) { // Get all buildings from a single player and a single game.
	var sql = 'SELECT b.building_id, g.game_id, p.player_id, g.game_name, p.player_name, pg.race, b.bld_name, pgb.quantity ' +
  	'FROM player_game pg ' +
  	'INNER JOIN player_game_building pgb ON (pg.game_id = pgb.game_id AND pg.player_id = pgb.player_id) ' +
  	'INNER JOIN player p ON pg.player_id = p.player_id ' +
  	'INNER JOIN game g ON pg.game_id = g.game_id ' +
  	'INNER JOIN building b ON pgb.building_id = b.building_id ' +
  	'WHERE g.game_id = ' + gameId + ' AND p.player_id = ' + playerId +
  	' ORDER BY pg.game_id, pg.player_id, b.building_id';
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.building = rows;
    	complete();
  	});
}

module.exports.editBldList = function(res, context, gameId, playerId, count, complete, pool) { // Alter one player's building list from a single game.
	var gamePlayerBuildingHelper = require('./gamePlayerBuilding.js');
	if (count == 0) {
		complete();
	} else {
		index = context.buildingList[count - 1].building_id;
		if (context.newList[index] < 0) {
			context.newList[index] = null;
		}
		if (context.newList[index]) {
			if (context.currentList[index]) {
				if (context.newList[index] == 0) {
					var sql = 'DELETE FROM player_game_building WHERE player_id = ' + playerId +
					' AND game_id = ' + gameId + ' AND building_id = ' + index;
					pool.query(sql, function(err, rows, fields) {
					    if(err){
				    	  next(err);
				      	return;
				    	}
				    	gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
				  	});
				} else if (context.newList[index] != context.currentList[index]) {
					var sql = 'UPDATE player_game_building SET quantity = ' + context.newList[index] +
					' WHERE player_id = ' + playerId + ' AND game_id = ' + gameId + ' AND building_id = ' + index;
					pool.query(sql, function(err, rows, fields) {
					    if(err){
				    	  next(err);
				      	return;
				    	}
				    	gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
				  	});
				} else {
					gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
				}
			} else {
				if (context.newList[index] != 0) {
					var sql = 'INSERT INTO player_game_building (game_id, player_id, building_id, quantity) ' +
					'VALUES (?,?,?,?)';
					pool.query(sql,
					[gameId, playerId, index, context.newList[index]],
					function(err, rows, fields) {
					    if(err){
				    	  next(err);
				      	return;
				    	}
				    	gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
					});
				} else {
				    gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
				}
			}	
		} else if (context.currentList[index]) {
			var sql = 'DELETE FROM player_game_building WHERE player_id = ' + playerId +
			' AND game_id = ' + gameId + ' AND building_id = ' + index;
			pool.query(sql, function(err, rows, fields) {
			    if(err){
		    	  next(err);
		      	return;
		    	}
		    	gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
		  	});
		} else {
	    	gamePlayerBuildingHelper.editBldList(res, context, gameId, playerId, --count, complete, pool);
		}
	}
}

module.exports.route_GET_gamePlayerBldChange = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
	var playerHelper = require('./player.js');
	var buildingHelper = require('./building.js');
	var callbackCount = 0;
	var subcallbackCount = 0;
  	var context = {};
	context.layout = 'game-player-bld-change-layout';
	gameHelper.getOneGame(res, context, req.session.game_id, subComplete, pool);
	playerHelper.getOneGamePlayer(res, context, req.session.game_id, req.session.player_id, subComplete, pool);
	function subComplete () {
		subcallbackCount++;
		if (subcallbackCount >= 2) {
			buildingHelper.getBuilding(res, context, complete, 'Race', context.player[0].race, 'None', pool);
		  	function complete() {
		    	callbackCount++;
		    	if(callbackCount >= 1) {
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
		    		context.building = context.results;
   		    		context.game_name = context.game[0].game_name;
   		    		context.player_name = context.player[0].player_name;
   		    		context.building.forEach ( function(e) {
   		    			e.game_name = context.game[0].game_name;
   		    			e.player_name = context.player[0].player_name;
   		    		});
		  			res.render('game-player-bld-change', context);
		    	}
		  	}
		}
	}
}

module.exports.route_POST_gamePlayerBldChange = function(req, res) {
	var context = {};
	if (req.body['Game Id']) {
		if (req.body['Player Id']) {
			req.session.player_id = req.body['Player Id'];
		}
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}

	if (req.body['GetGameAndPlayerId']) {
		context.game_id = req.session.game_id;
		context.player_id = req.session.player_id;
	    res.send(context);
	}
}

