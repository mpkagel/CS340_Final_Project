/*************************************************************
** File Name: game.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the game entity.
*************************************************************/
module.exports.getGame = function(res, context, complete, sel, selVal, sort, pool) { // Get list of games with possible selection and sort criteria.
	var sqlContext = {};
	if (selVal == '2') {
		var sql = 'SELECT game_id, game_name, game_type, game_time, date_played ' +
  		'FROM game g ' +
  		'WHERE map_id IS NULL ';
  		subComplete();
	} else {
		var sql = 'SELECT game_id, game_name, game_type, game_time, date_played, map_name ' +
	  	'FROM game g ' +
	  	'LEFT JOIN map m ON m.map_id = g.map_id ';
	  	if ((selVal != '1') && (selVal != 'All')) {
	  		if (sel == 'Game Type') {
	  			sql += 'WHERE game_type = \'' + selVal + '\' ';
	  			subComplete();
	  		} else if (sel == 'Map Name') {
		  		subComplete();
	  		} else {
	  			subComplete();
	  		} 
	  	} else {
	  		subComplete();
	  	}
	}
  	function subComplete() {
  		if ((sel == 'Map Name') && (selVal != '1') && (selVal != '2')) {
	  		sql += 'WHERE m.map_id = ' + selVal + ' ';
  		}
	  	sql += 'GROUP BY game_id, game_name';
	  	if (sort == 'Game Type') sql += ' ORDER BY game_type';
	  	else if (sort == 'Map Name' && selVal != '2') sql += ' ORDER BY map_name';
	  	else if (sort == 'All' && selVal != '2') sql += ' ORDER BY game_type, map_name';
	  	pool.query(sql, function(err, rows, fields) {
		    if(err){
	    	  console.log(err);
	      	return;
	    	}
	    	context.results = rows;
	    	complete();
	  	});
	}
}

module.exports.getOneGame = function(res, context, id, complete, pool) { // Get one game.
	var sql = 'SELECT g.map_id AS map, game_id, game_name, game_type, game_time, date_played, map_name ' +
  	'FROM game g ' +
  	'LEFT JOIN map m ON m.map_id = g.map_id ' +
  	'WHERE game_id = ' + id;
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.game = rows;
    	complete();
  	});
}

module.exports.route_GET_root = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
  	var context = {};
	if (req.session.gameSel == undefined) {
		req.session.gameSel = 'None';
	}
	if (req.session.gameSelVal == undefined) {
		req.session.gameSelVal = '1';
	}
	if (req.session.gameSort == undefined) {
		req.session.gameSort = 'None';
	}
	gameHelper.getGame(res, context, complete, req.session.gameSel, req.session.gameSelVal, req.session.gameSort, pool);
  	function complete() {
  		context.results.forEach( function(e) {
    		if (e.map_name == null) {
    			e.map_name = 'null';
    		}
    	});
    	if (req.session.warning) {
			context.warning = req.session.warning;
			req.session.warning = null;
		}
  		res.render('home', context);
  	}
}

module.exports.route_POST_root = function(req, res, pool) {
	var gameHelper = require('./game.js');
	var gamePlayerHelper = require('./gamePlayer.js');
	var context = {};
	if (req.body['ValUpdate']) {
		if (req.body['Select']) {
			req.session.gameSel = req.body['Select'];
		} else if (req.body['SelectVal']) {
			req.session.gameSelVal = req.body['SelectVal'];
		} else if (req.body['Sort']) {
			req.session.gameSort = req.body['Sort'];
		}
    	res.end();
    }
	
	if (req.body['GetCurrSel']) {
		res.send(req.session.gameSel);
	} else if (req.body['GetCurrSelVal']) {
		res.send(req.session.gameSelVal);
	} else if (req.body['GetCurrSort']) {
		res.send(req.session.gameSort);
	}
	
	if (req.body['GetGames']) {
		gameHelper.getGame(res, context, complete1, req.session.gameSel, req.session.gameSelVal, req.session.gameSort, pool);
  	function complete1() {
  		context.results.forEach( function(e) {
			if (e.map_name == null) {
	   			e.map_name = 'null';
	   		}
  		});
  		res.send(context);
  	}
	}

	if (req.body['GetGame']) {
		gameHelper.getOneGame(res, context, req.session.game_id, complete2, pool);
		function complete2() {
			if (context.game[0].map == null) {
				context.game[0].map = 1;
			}
			res.send(JSON.stringify(context.game[0].map));
		}
	}

	if (req.body['GetGameType']) {
		gameHelper.getOneGame(res, context, req.body['GetGameType'], complete3, pool);
		function complete3() {
			res.send(context.game[0].game_type);
		}
	}

	if (req.body['Add Item']) {
		if (req.body.map == '1') {
			req.body.map = null;
		}
		var sql = 'INSERT INTO game (map_id, game_name, game_type, game_time, date_played) ' +
		'VALUES (?,?,?,?,?)';
		pool.query(sql,
			[req.body.map, req.body.name, req.body.type, req.body.time, req.body.date],
		 function(err, result) {
		    if(err){
		    	req.session.sqlMessage = err.sqlMessage;
		        res.send(err);
	      		return;
	    	}
		    if (req.session.gameSel == undefined) {
				req.session.gameSel = 'None';
			}
			if (req.session.gameSelVal == undefined) {
				req.session.gameSelVal = '1';
			}
			if (req.session.gameSort == undefined) {
				req.session.gameSort = 'None';
			}
			gameHelper.getGame(res, context, complete4, req.session.gameSel, req.session.gameSelVal, req.session.gameSort, pool);
		  	function complete4() {
		  		context.results.forEach( function(e) {
		    		if (e.map_name == null) {
		    			e.map_name = 'null';
		    		}
		    	});
		    	req.session.warning = 'Players, units, and buildings can be added to ' + req.body.name +
		    	' through the ' + req.body.name + ' Player List!';
		  		res.render('home', context);
		  	}
		});
    }

    if (req.body['Edit Request']) {
		if (req.body.map == '1') {
			req.body.map = null;
		}
	  	pool.query('SELECT * FROM game WHERE game_id=?', [req.session.game_id], function(err, result) {
	        if(err){
	          next(err);
	          return;
	        }
	        if(result.length == 1){
	          	var curVals = result[0];
	          	if (req.body.map == null) {
	          		curVals.map_id = null;
	          	}
	          	pool.query('UPDATE game SET map_id=?, game_name=?, game_type=?, game_time=?, date_played=? WHERE game_id=? ',
	            	[req.body.map || curVals.map_id, req.body.name || curVals.game_name, req.body.type || curVals.game_type, 
	             	req.body.time || curVals.game_time, req.body.date || curVals.date_played, req.session.game_id],
	            function(err, result) {
		           	if(err){
		           		req.session.sqlMessage = err.sqlMessage;
		           		res.send(err);
			  			return;
			  		}
		            if (req.session.gameSel == undefined) {
						req.session.gameSel = 'None';
					}
					if (req.session.gameSelVal == undefined) {
						req.session.gameSelVal = '1';
					}
					if (req.session.gameSort == undefined) {
						req.session.gameSort = 'None';
					}
					if (req.body.type != curVals.game_type) {
						gamePlayerHelper.deleteOneGamePlayers(res, req.session.game_id, subComplete, pool); 
						function subComplete() {
						  	if (req.session.gameSel == undefined) {
								req.session.gameSel = 'None';
							}
							if (req.session.gameSelVal == undefined) {
								req.session.gameSelVal = '1';
							}
							if (req.session.gameSort == undefined) {
								req.session.gameSort = 'None';
							}
							gameHelper.getGame(res, context, complete5, req.session.gameSel, req.session.gameSelVal, req.session.gameSort, pool);
						  	function complete5() {
						  		context.results.forEach( function(e) {
						    		if (e.map_name == null) {
						    			e.map_name = 'null';
						    		}
						    	});
						    	req.session.warning = 'All game-player relationships from ' + req.body.name + 
							  	' have been removed due to a game type update!';
						  		res.render('home', context);
						  	}
						}	
					} else {
						if (req.session.gameSel == undefined) {
							req.session.gameSel = 'None';
						}
						if (req.session.gameSelVal == undefined) {
							req.session.gameSelVal = '1';
						}
						if (req.session.gameSort == undefined) {
							req.session.gameSort = 'None';
						}
						gameHelper.getGame(res, context, complete6, req.session.gameSel, req.session.gameSelVal, req.session.gameSort, pool);
					  	function complete6() {
					  		context.results.forEach( function(e) {
					    		if (e.map_name == null) {
					    			e.map_name = 'null';
					    		}
					    	});
					  		res.render('home', context);
					  	}
					}			
			   	});
			}
		});
    }

    if (req.body['Delete Item']) {
		var sql = 'DELETE FROM game WHERE game_id=?'
		pool.query(sql, [req.session.game_id], function(err, result) {
		    if(err){
	    	  	next(err);
	      		return;
	    	}
	    	if (req.session.gameSel == undefined) {
				req.session.gameSel = 'None';
			}
			if (req.session.gameSelVal == undefined) {
				req.session.gameSelVal = '1';
			}
			if (req.session.gameSort == undefined) {
				req.session.gameSort = 'None';
			}
			gameHelper.getGame(res, context, complete7, req.session.gameSel, req.session.gameSelVal, req.session.gameSort, pool);
		  	function complete7() {
		  		context.results.forEach( function(e) {
		    		if (e.map_name == null) {
		    			e.map_name = 'null';
		    		}
		    	});
		  		res.render('home', context);
		  	}
	  	});
    }
}

module.exports.route_GET_gameAdd = function(req, res, next) {
  	var context = {};
  	if (req.session.gameAddSelVal == undefined) {
		req.session.gameAddSelVal = 'None';
	}
	if (req.session.sqlMessage) {
		context.warningSql = req.session.sqlMessage;
		req.session.sqlMessage = null;
	}
	context.layout = 'game-add-layout'
  	res.render('game-add', context);
}

module.exports.route_POST_gameAdd = function(req, res, pool) {
	var mapHelper = require('./map.js');
	var context = {};
	if (req.body['ValUpdate']) {
		if (req.body['SelectVal']) {
			req.session.gameAddSelVal = req.body['SelectVal'];
		} 
    	res.end();
    }
	
	if (req.body['GetCurrSelVal']) {
		res.send(req.session.gameAddSelVal);
	} 
	
	if (req.body['GetMaps']) {
	    mapHelper.getMap(res, context, complete, 'Map Type', req.session.gameAddSelVal, 'None', pool);
	    function complete() {
	    	context.results.forEach( function(e) {
	    		if (e.designer == null) {
	    			e.designer = 'null';
	    		}
	    		if (e.tile_set == null) {
	    			e.tile_set = 'null';
	    		}
	    	});
		  	res.send(context);	
	    }  	
	}	
}

module.exports.route_GET_gameUpdate = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
  	var context = {};
  	if (req.session.gameUpdSelVal == undefined) {
		req.session.gameUpdSelVal = 'None';
	}
	context.layout = 'game-update-layout'
	gameHelper.getOneGame(res, context, req.session.game_id, complete, pool);
	function complete() {
		if (req.session.sqlMessage) {
			context.warningSql = req.session.sqlMessage;
			req.session.sqlMessage = null;
		}
		req.session.gameUpdSelVal = context.game[0].game_type;
	  	res.render('game-update', context);
	}
}

module.exports.route_POST_gameUpdate = function(req, res, pool) {
	var mapHelper = require('./map.js');
	var context = {};
	if (req.body['Game Id']) {
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}

	if (req.body['ValUpdate']) {
		if (req.body['SelectVal']) {
			req.session.gameUpdSelVal = req.body['SelectVal'];
		} 
    	res.end();
    }
	
	if (req.body['GetCurrSelVal']) {
		res.send(req.session.gameUpdSelVal);
	} 
	
	if (req.body['GetMaps']) {
	    mapHelper.getMap(res, context, complete, 'Map Type', req.session.gameUpdSelVal, 'None', pool);
	    function complete() {
	    	context.results.forEach( function(e) {
	    		if (e.designer == null) {
	    			e.designer = 'null';
	    		}
	    		if (e.tile_set == null) {
	    			e.tile_set = 'null';
	    		}
	    	});
		  	res.send(context);	
	    }  	
	}	
}

module.exports.route_GET_gameDelete = function(req, res, next, pool) {
	var gameHelper = require('./game.js');
	var gamePlayerHelper = require('./gamePlayer.js');
	var callbackCount = 0;
  	var context = {};
	context.layout = 'game-delete-layout';
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
  			res.render('game-delete', context);
    	}
  	}
}

module.exports.route_POST_gameDelete = function(req, res) {
	if (req.body['Game Id']) {
	    req.session.game_id = req.body['Game Id'];
	    res.end();
	}
}
