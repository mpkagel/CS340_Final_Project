/*************************************************************
** File Name: player.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the player entity.
*************************************************************/
module.exports.getOneGamePlayer = function(res, context, gameId, playerId, complete, pool) { // Get a single player from a single game.
	var sql = 'SELECT g.game_id, p.player_id, g.game_type, g.game_name, p.player_name, pg.outcome, pg.race, pg.team ' +
  	'FROM game g ' +
  	'INNER JOIN player_game pg ON pg.game_id = g.game_id ' +
  	'INNER JOIN player p ON p.player_id = pg.player_id ' +
  	'WHERE g.game_id = ' + gameId + ' AND p.player_id = ' + playerId;
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.player = rows;
    	complete();
  	});
}

module.exports.getPlayer = function(res, context, complete, sel, selVal, sort, pool) { // Get list of players with possible selection and sort criteria.
	var sqlContext = {};
	var sql = 'SELECT player_id, player_name, wins, losses ' +
  	'FROM player ';
  	if ((selVal != '1') && (selVal != 'All')) {
  		if (sel == 'Player Name') {
  			subComplete();
  		} else {
  			subComplete();
  		}
  	} else {
  		subComplete();
  	}
  	function subComplete() {
  		if ((sel == 'Player Name') && (selVal != '1')) {
	  		sql += 'WHERE player_id = ' + selVal + ' ';
  		}
	  	sql += 'GROUP BY player_id, player_name';
	  	if (sort == 'Player Name') sql += ' ORDER BY player_name';
	  	else if (sort == 'Wins') sql += ' ORDER BY wins DESC';
	  	else if (sort == 'Losses') sql += ' ORDER BY losses DESC';
	  	pool.query(sql, function(err, rows, fields) {
		    if(err){
	    	  next(err);
	      	return;
	    	}
	    	context.results = rows;
	    	complete();
	  	});
	}
}

module.exports.getOnePlayer = function(res, context, id, complete, pool) { // Get one player.
	var sql = 'SELECT player_id, player_name, wins, losses ' +
  	'FROM player WHERE player_id = ' + id;
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.results = rows;
    	complete();
  	});
}

module.exports.route_GET_players = function(req, res, next, pool) {
  var playerHelper = require('./player.js');
  var context = {};
  if (req.session.playerSel == undefined) {
    req.session.playerSel = 'None';
  }
  if (req.session.playerSelVal == undefined) {
    req.session.playerSelVal = '1';
  }
  if (req.session.playerSort == undefined) {
    req.session.playerSort = 'None';
  }
  context.layout = 'player-layout';
    playerHelper.getPlayer(res, context, complete, req.session.playerSel, req.session.playerSelVal, req.session.playerSort, pool);
    function complete() {
      res.render('player', context);
    }     
}

module.exports.route_POST_players = function(req, res, pool) {
  var playerHelper = require('./player.js');
  var context = {};
  if (req.body['GetPlayers']) {
      playerHelper.getPlayer(res, context, complete1, 'None', '1', 'None', pool);
      function complete1() {
        res.send(context);  
      }   
  }

  if (req.body['GetPlayersSpecific']) {
      playerHelper.getPlayer(res, context, complete2, req.session.playerSel, req.session.playerSelVal, req.session.playerSort, pool);
      function complete2() {
        res.send(context);  
      }   
  }

  if (req.body['ValUpdate']) {
    if (req.body['Select']) {
      req.session.playerSel = req.body['Select'];
    } else if (req.body['SelectVal']) {
      req.session.playerSelVal = req.body['SelectVal'];
    } else if (req.body['Sort']) {
      req.session.playerSort = req.body['Sort'];
    }
      res.end();
    }
  
  if (req.body['GetCurrSel']) {
    res.send(req.session.playerSel);
  } else if (req.body['GetCurrSelVal']) {
    res.send(req.session.playerSelVal);
  } else if (req.body['GetCurrSort']) {
    res.send(req.session.playerSort);
  }

  if (req.body['Add Item']) {
    var sql = 'INSERT INTO player (player_name, wins, losses) ' +
    'VALUES (?,?,?)';
    pool.query(sql,
      [req.body.name, req.body.wins, req.body.losses],
     function(err, result) {
        if(err){
            req.session.sqlMessage = err.sqlMessage;
            res.send(err);
            return;
        }
        if (req.session.playerSel == undefined) {
        req.session.playerSel = 'None';
      }
      if (req.session.playerSelVal == undefined) {
        req.session.playerSelVal = '1';
      }
      if (req.session.playerSort == undefined) {
        req.session.playerSort = 'None';
      }
      context.layout = 'player-layout';
      playerHelper.getPlayer(res, context, complete3, req.session.playerSel, req.session.playerSelVal, req.session.playerSort, pool);
        function complete3() {
          res.render('player', context);
        }
      });
    }

    if (req.body['Edit Request']) {
      pool.query('SELECT * FROM player WHERE player_id=?', [req.session.player_id], function(err, result) {
          if(err){
            next(err);
            return;
          }
          if(result.length == 1){
              var curVals = result[0];
              pool.query('UPDATE player SET player_name=?, wins=?, losses=? WHERE player_id=? ',
                [req.body.name || curVals.player_name, req.body.wins || curVals.wins, req.body.losses || curVals.losses, 
                req.session.player_id],
              function(err, result) {
                if(err){
            req.session.sqlMessage = err.sqlMessage;
                  res.send(err);
                  return;
                }
                if (req.session.playerSel == undefined) {
            req.session.playerSel = 'None';
          }
          if (req.session.playerSelVal == undefined) {
            req.session.playerSelVal = '1';
          }
          if (req.session.playerSort == undefined) {
            req.session.playerSort = 'None';
          }
          context.layout = 'player-layout';
          playerHelper.getPlayer(res, context, complete4, req.session.playerSel, req.session.playerSelVal, req.session.playerSort, pool);
            function complete4() {
              res.render('player', context);
            }
        });
      }
    });
    }

    if (req.body['Delete Item']) {
    var sql = 'DELETE FROM player WHERE player_id=?'
    pool.query(sql, [req.body['Delete Item']], function(err, result) {
        if(err){
            next(err);
            return;
        }
        if (req.session.playerSel == undefined) {
        req.session.playerSel = 'None';
      }
      if (req.session.playerSelVal == undefined) {
        req.session.playerSelVal = '1';
      }
      if (req.session.playerSort == undefined) {
        req.session.playerSort = 'None';
      }
      context.layout = 'player-layout';
      playerHelper.getPlayer(res, context, complete5, req.session.playerSel, req.session.playerSelVal, req.session.playerSort, pool);
        function complete5() {
          res.render('player', context);
        }
      });
    }
}

module.exports.route_GET_playerAdd = function(req, res, next) {
  var context = {};
  if (req.session.sqlMessage) {
    context.warningSql = req.session.sqlMessage;
    req.session.sqlMessage = null;
  }
  context.layout = 'player-add-layout'
    res.render('player-add', context);
}

module.exports.route_GET_playerUpdate = function(req, res, next, pool) {
  var playerHelper = require('./player.js');
  var context = {};
  context.layout = 'player-update-layout'
  playerHelper.getOnePlayer(res, context, req.session.player_id, complete, pool);
  function complete() {
    if (req.session.sqlMessage) {
      context.warningSql = req.session.sqlMessage;
      req.session.sqlMessage = null;
    }
      res.render('player-update', context);
  }
}

module.exports.route_POST_playerUpdate = function(req, res) {
  if (req.body['Player Id']) {
      req.session.player_id = req.body['Player Id'];
      res.end();
  }
}
