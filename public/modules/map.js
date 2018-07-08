/*************************************************************
** File Name: map.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the map entity.
*************************************************************/
module.exports.getMap = function(res, context, complete, sel, selVal, sort, pool) { // Get list of maps with possible selection and sort critieria.
	var sqlContext = {};
	var sql = 'SELECT map_id, map_name, map_type, horizontal_length, vertical_length, designer, tile_set ' +
  	'FROM map ';
  	if ((selVal != '1') && (selVal != 'All')) {
  		if (sel == 'Map Name') {
  			subComplete();
  		} else if (sel == 'Map Type') {
  			sql += 'WHERE map_type = \'' + selVal + '\' ';
  			subComplete();
  		} else {
  			subComplete();
  		}
  	} else {
  		subComplete();
  	}
  	function subComplete() {
  		if ((sel == 'Map Name') && (selVal != '1')) {
	  		sql += 'WHERE map_id = ' + selVal + ' ';
  		}
	  	sql += 'GROUP BY map_id, map_name';
	  	if (sort == 'Map Name') sql += ' ORDER BY map_name';
	  	else if (sort == 'Map Type') sql += ' ORDER BY map_type';
	  	else if (sort == 'All') sql += ' ORDER BY map_type, map_name';
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

module.exports.getOneMap = function(res, context, id, complete, pool) { // Get one map.
	var sql = 'SELECT map_id, map_name, map_type, horizontal_length, vertical_length, designer, tile_set ' +
  	'FROM map WHERE map_id = ' + id;
  	pool.query(sql, function(err, rows, fields) {
	    if(err){
    	  next(err);
      	return;
    	}
    	context.results = rows;
    	complete();
  	});
}

module.exports.route_GET_maps = function(req, res, next, pool) {
	var mapHelper = require('./map.js');
	var context = {};
	if (req.session.mapSel == undefined) {
		req.session.mapSel = 'None';
	}
	if (req.session.mapSelVal == undefined) {
		req.session.mapSelVal = '1';
	}
	if (req.session.mapSort == undefined) {
		req.session.mapSort = 'None';
	}
	context.layout = 'map-layout';
    mapHelper.getMap(res, context, complete, req.session.mapSel, req.session.mapSelVal, req.session.mapSort, pool);
    function complete() {
    	context.results.forEach( function(e) {
    		if (e.designer == null) {
    			e.designer = 'null';
    		}
    		if (e.tile_set == null) {
    			e.tile_set = 'null';
    		}
    	});
    	if (req.session.warning) {
			context.warning = req.session.warning;
			req.session.warning = null;
		}
	  	res.render('map', context);	
    }    	
}

module.exports.route_POST_maps = function(req, res, pool) {
	var mapHelper = require('./map.js');
	var context = {};
	if (req.body['ValUpdate']) {
		if (req.body['Select']) {
			req.session.mapSel = req.body['Select'];
		} else if (req.body['SelectVal']) {
			req.session.mapSelVal = req.body['SelectVal'];
		} else if (req.body['Sort']) {
			req.session.mapSort = req.body['Sort'];
		}
    	res.end();
    }
	
	if (req.body['GetCurrSel']) {
		res.send(req.session.mapSel);
	} else if (req.body['GetCurrSelVal']) {
		res.send(req.session.mapSelVal);
	} else if (req.body['GetCurrSort']) {
		res.send(req.session.mapSort);
	}

	if (req.body['GetMaps']) {
	    mapHelper.getMap(res, context, complete1, 'None', 'All', 'None', pool);
	    function complete1() {
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

	if (req.body['GetMapsSpecific']) {
    	mapHelper.getMap(res, context, complete2, req.session.mapSel, req.session.mapSelVal, req.session.mapSort, pool);
	    function complete2() {
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

	if (req.body['GetMap']) {
	    mapHelper.getOneMap(res, context, req.session.map_id, complete3, pool);
	    function complete3() {
	    	context.results.forEach( function(e) {
	    		if (e.designer == null) {
	    			e.designer = 'null';
	    		}
	    		if (e.tile_set == null) {
	    			e.tile_set = 'null';
	    		}
	    	});
		  	res.send(context.results[0].map_type);	
	    }  	
	}

	if (req.body['Add Item']) {
		var sql = 'INSERT INTO map (map_name, map_type, horizontal_length, ' +
		'vertical_length, designer, tile_set) ' +
		'VALUES (?,?,?,?,?,?)';
		pool.query(sql,
			[req.body.name, req.body.type, req.body.horizontal, req.body.vertical,
			 req.body.designer, req.body.tile_set],
		 function(err, result) {
		    if(err){
	    	  	req.session.sqlMessage = err.sqlMessage;
		        res.send(err);
	      		return;
	    	}
	    	if (req.session.mapSel == undefined) {
				req.session.mapSel = 'None';
			}
			if (req.session.mapSelVal == undefined) {
				req.session.mapSelVal = '1';
			}
			if (req.session.mapSort == undefined) {
				req.session.mapSort = 'None';
			}
			context.layout = 'map-layout';
			mapHelper.getMap(res, context, complete4, req.session.mapSel, req.session.mapSelVal, req.session.mapSort, pool);
  			function complete4() {
  				context.results.forEach( function(e) {
		    		if (e.designer == null) {
		    			e.designer = 'null';
		    		}
		    		if (e.tile_set == null) {
		    			e.tile_set = 'null';
		    		}
    			});
  				res.render('map', context);
  			}
	  	});
    }

    if (req.body['Edit Request']) {
	  	pool.query('SELECT * FROM map WHERE map_id=?', [req.session.map_id], function(err, result) {
	        if(err){
	          next(err);
	          return;
	        }
	        if(result.length == 1) {
	          	var curVals = result[0];
          		pool.query('SELECT * FROM game WHERE map_id=?', [req.session.map_id], function(err, result) {
          			if(err){
			    	  	next(err);
			      		return;
					}
					context.game = result;
					if (context.game.length <= 0 || req.body.type == curVals.map_type) {
						if (!req.body.designer) {
	          				curVals.designer = null;
	          			}
	          			if (req.body.designer == 'null') {
	          				curVals.designer = 'null';
	          			}
	          			if (!req.body.tile_set) {
	          				curVals.tile_set = null;
	          			}
	          			if (req.body.tile_set == 'null') {
	          				curVals.tile_set = 'null';
	          			}
						pool.query('UPDATE map SET map_name=?, map_type=?, horizontal_length=?, vertical_length=?, designer=?, tile_set=? WHERE map_id=? ',
		            	[req.body.name || curVals.map_name, req.body.type || curVals.map_type, req.body.horizontal || curVals.horizontal_length, 
		             	req.body.vertical || curVals.vertical_length, req.body.designer || curVals.designer, req.body.tile_set || curVals.tile_set, req.session.map_id],
			           	function(err, result) {
				           	if(err){
				                req.session.sqlMessage = err.sqlMessage;
	           					res.send(err);
				              return;
				            }
				            if (req.session.mapSel == undefined) {
								req.session.mapSel = 'None';
							}
							if (req.session.mapSelVal == undefined) {
								req.session.mapSelVal = '1';
							}
							if (req.session.mapSort == undefined) {
								req.session.mapSort = 'None';
							}
							context.layout = 'map-layout';
							mapHelper.getMap(res, context, complete5, req.session.mapSel, req.session.mapSelVal, req.session.mapSort, pool);
				  			function complete5() {
				  				context.results.forEach( function(e) {
						    		if (e.designer == null) {
						    			e.designer = 'null';
						    		}
						    		if (e.tile_set == null) {
						    			e.tile_set = 'null';
						    		}
				    			});
				  				res.render('map', context);
				  			}
					   	});
					} else {
						context.layout = 'map-layout';
						req.session.warning = req.body.name;
						mapHelper.getMap(res, context, complete6, req.session.mapSel, req.session.mapSelVal, req.session.mapSort, pool);
						function complete6() {
							context.results.forEach( function(e) {
					    		if (e.designer == null) {
					    			e.designer = 'null';
					    		}
					    		if (e.tile_set == null) {
					    			e.tile_set = 'null';
					    		}
			    			});
			  				res.render('map', context);
						}
					}
          		});          	
			}
		});
    }

    if (req.body['Delete Item']) {
		var sql = 'DELETE FROM map WHERE map_id=?'
		pool.query(sql, [req.body['Delete Item']], function(err, result) {
		    if(err){
	    	  	next(err);
	      		return;
	    	}
	    	if (req.session.mapSel == undefined) {
				req.session.mapSel = 'None';
			}
			if (req.session.mapSelVal == undefined) {
				req.session.mapSelVal = '1';
			}
			if (req.session.mapSort == undefined) {
				req.session.mapSort = 'None';
			}
			context.layout = 'map-layout';
			mapHelper.getMap(res, context, complete7, req.session.mapSel, req.session.mapSelVal, req.session.mapSort, pool);
  			function complete7() {
  				context.results.forEach( function(e) {
		    		if (e.designer == null) {
		    			e.designer = 'null';
		    		}
		    		if (e.tile_set == null) {
		    			e.tile_set = 'null';
		    		}
    			});
  				res.render('map', context);
  			}
	  	});
    }
}

module.exports.route_GET_mapAdd = function(req, res, next) {
  	var context = {};
  	if (req.session.sqlMessage) {
		context.warningSql = req.session.sqlMessage;
		req.session.sqlMessage = null;
	}
	context.layout = 'map-add-layout'
  	res.render('map-add', context);
}

module.exports.route_GET_mapUpdate = function(req, res, next, pool) {
	var mapHelper = require('./map.js');
  	var context = {};
	context.layout = 'map-update-layout'
	mapHelper.getOneMap(res, context, req.session.map_id, complete, pool);
	function complete() {
		context.results.forEach( function(e) {
    		if (e.designer == null) {
    			e.designer = 'null';
    		}
    		if (e.tile_set == null) {
    			e.tile_set = 'null';
    		}
    	});
		if (req.session.sqlMessage) {
			context.warningSql = req.session.sqlMessage;
			req.session.sqlMessage = null;
		}
	  	res.render('map-update', context);
	}
}

module.exports.route_POST_mapUpdate = function(req, res) {
	if (req.body['Map Id']) {
	    req.session.map_id = req.body['Map Id'];
	    res.end();
	}
}
