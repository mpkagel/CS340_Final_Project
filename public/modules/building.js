/*************************************************************
** File Name: building.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the building entity.
*************************************************************/
module.exports.getBuilding = function(res, context, complete, sel, selVal, sort, pool) { // Get a list of buildings with possible selection and sort criteria.
  	var sqlContext = {};
	var sql = 'SELECT building_id, bld_name, race, mineral_cost, vespene_cost, build_time, life, shields, armor ' +
  	'FROM building ';
  	if ((selVal != '1') && (selVal != 'All')) {
  		if (sel == 'Race') {
			sql += 'WHERE race = \'' + selVal + '\' ';
  			subComplete();
  		} else {
  			subComplete();
  		}
  	} else {
  		subComplete();
  	}
  	function subComplete() {
	  	sql += 'GROUP BY building_id, bld_name';
	  	if (sort == 'Bld Name') sql += ' ORDER BY bld_name';
	  	else if (sort == 'Race') sql += ' ORDER BY race';
	  	else if (sort == 'All') sql += ' ORDER BY race, bld_name';
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

module.exports.route_GET_buildings = function(req, res, next, pool) {
	var buildingHelper = require('./building.js');
	var context = {};
	if (req.session.bldSel == undefined) {
		req.session.bldSel = 'None';
	}
	if (req.session.bldSelVal == undefined) {
		req.session.bldSelVal = '1';
	}
	if (req.session.bldSort == undefined) {
		req.session.bldSort = 'None';
	}
	context.layout = 'building-layout';
    buildingHelper.getBuilding(res, context, complete, req.session.bldSel, req.session.bldSelVal, req.session.bldSort, pool);
    function complete() {
    	context.results.forEach( function(e) {
    		if (e.shields == null) {
    			e.shields = 'null';
    		}
    	});
  		res.render('building', context);
	} 
}

module.exports.route_POST_buildings = function(req, res) {	
	if (req.body['ValUpdate']) {
		if (req.body['Select']) {
			req.session.bldSel = req.body['Select'];
		} else if (req.body['SelectVal']) {
			req.session.bldSelVal = req.body['SelectVal'];
		} else if (req.body['Sort']) {
			req.session.bldSort = req.body['Sort'];
		}
    	res.end();
    }
	
	if (req.body['GetCurrSel']) {
		res.send(req.session.bldSel);
	} else if (req.body['GetCurrSelVal']) {
		res.send(req.session.bldSelVal);
	} else if (req.body['GetCurrSort']) {
		res.send(req.session.bldSort);
	}
}