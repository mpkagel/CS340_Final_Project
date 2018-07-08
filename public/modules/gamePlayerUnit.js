/*************************************************************
** File Name: gamePlayerUnit.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the player_game_unit entity.
*************************************************************/
module.exports.getGamePlayerUnitList = function(res, context, id, count, complete, pool) { // Recursive call, function assumes that getGamePlayerList has been called.
	var gamePlayerUnitHelper = require('./gamePlayerUnit.js');
	if (count == 0) { // Get all units for all players from a single game.
		complete();
	} else {
		var sql = 'SELECT u.unit_id, g.game_id, p.player_id, g.game_name, p.player_name, pg.race, u.unit_name, pgu.quantity ' +
	  	'FROM player_game pg ' +
	  	'INNER JOIN player_game_unit pgu ON (pg.game_id = pgu.game_id AND pg.player_id = pgu.player_id) ' +
	  	'INNER JOIN player p ON pg.player_id = p.player_id ' +
	  	'INNER JOIN game g ON pg.game_id = g.game_id ' +
	  	'INNER JOIN unit u ON pgu.unit_id = u.unit_id ' +
	  	'WHERE g.game_id = ' + id + ' AND p.player_id = ' + context.player[count - 1].player_id +
	  	' ORDER BY pg.game_id, pg.player_id, u.unit_id';
	  	pool.query(sql, function(err, rows, fields) {
		    if(err){
	    	  next(err);
	      	return;
	    	}
	    	context.player[count -1].unit = rows;
	    	gamePlayerUnitHelper.getGamePlayerUnitList(res, context, id, --count, complete, pool);
	  	});
	}	
}

module.exports.getOneGamePlayerUnitList = function(res, context, gameId, playerId, complete, pool) { // Get all units from a single player and a single game.
	var sql = 'SELECT u.unit_id, g.game_id, p.player_id, g.game_name, p.player_name, pg.race, u.unit_name, pgu.quantity ' +
  	'FROM player_game pg ' +
  	'INNER JOIN player_game_unit pgu ON (pg.game_id = pgu.game_id AND pg.player_id = pgu.player_id) ' +
  	'INNER JOIN player p ON pg.player_id = p.player_id ' +
  	'INNER JOIN game g ON pg.game_id = g.game_id ' +
  	'INNER JOIN unit u ON pgu.unit_id = u.unit_id ' +
  	'WHERE g.game_id = ' + gameId + ' AND p.player_id = ' + playerId +
  	' ORDER BY pg.game_id, pg.player_id, u.unit_id';
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.unit = rows;
    	complete();
  	});	
}

module.exports.editUnitList = function(res, context, gameId, playerId, count, complete, pool) { // Alter one player's unit list from a single game.
	var gamePlayerUnitHelper = require('./gamePlayerUnit.js');
	if (count == 0) {
		complete();
	} else {
		index = context.unitList[count - 1].unit_id;
		if (context.newList[index] < 0) {
			context.newList[index] = null;
		}
		if (context.newList[index]) {
			if (context.currentList[index]) {
				if (context.newList[index] == 0) {
					var sql = 'DELETE FROM player_game_unit WHERE player_id = ' + playerId +
					' AND game_id = ' + gameId + ' AND unit_id = ' + index;
					pool.query(sql, function(err, rows, fields) {
					    if(err){
				    	  next(err);
				      	return;
				    	}
				    	gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
				  	});
				} else if (context.newList[index] != context.currentList[index]) {
					var sql = 'UPDATE player_game_unit SET quantity = ' + context.newList[index] +
					' WHERE player_id = ' + playerId + ' AND game_id = ' + gameId + ' AND unit_id = ' + index;
					pool.query(sql, function(err, rows, fields) {
					    if(err){
				    	  next(err);
				      	return;
				    	}
				    	gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
				  	});
				} else {
					gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
				}
			} else {
				if (context.newList[index] != 0) {
					var sql = 'INSERT INTO player_game_unit (game_id, player_id, unit_id, quantity) ' +
					'VALUES (?,?,?,?)';
					pool.query(sql,
					[gameId, playerId, index, context.newList[index]],
					function(err, rows, fields) {
					    if(err){
				    	  next(err);
				      	return;
				    	}
				    	gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
					});
				} else {
				    gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
				}
			}	
		} else if (context.currentList[index]) {
			var sql = 'DELETE FROM player_game_unit WHERE player_id = ' + playerId +
			' AND game_id = ' + gameId + ' AND unit_id = ' + index;
			pool.query(sql, function(err, rows, fields) {
			    if(err){
		    	  next(err);
		      	return;
		    	}
		    	gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
		  	});
		} else {
	    	gamePlayerUnitHelper.editUnitList(res, context, gameId, playerId, --count, complete, pool);
		}
	}
}

module.exports.route_GET_gamePlayerUnitChange = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
	var playerHelper = require('./player.js');
	var unitHelper = require('./unit.js');
	var callbackCount = 0;
	var subcallbackCount = 0;
  	var context = {};
	context.layout = 'game-player-unit-change-layout';
	gameHelper.getOneGame(res, context, req.session.game_id, subComplete, pool);
	playerHelper.getOneGamePlayer(res, context, req.session.game_id, req.session.player_id, subComplete, pool);
	function subComplete () {
		subcallbackCount++;
		if (subcallbackCount >= 2) {
			unitHelper.getUnit(res, context, complete, 'Race', context.player[0].race, 'None', pool);
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
		    		context.unit = context.results;
   		    		context.game_name = context.game[0].game_name;
   		    		context.player_name = context.player[0].player_name;
   		    		context.unit.forEach ( function(e) {
   		    			e.game_name = context.game[0].game_name;
   		    			e.player_name = context.player[0].player_name;
   		    		});
		  			res.render('game-player-unit-change', context);
		    	}
		  	}
		}
	}
}

module.exports.route_POST_gamePlayerUnitChange = function(req, res) {
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