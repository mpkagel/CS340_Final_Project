/*************************************************************
** File Name: unit.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that has handlers
**   and queries for the unit entity.
*************************************************************/
module.exports.getUnit = function(res, context, complete, sel, selVal, sort, pool) { // Get a list of units with possible selection and sort criteria.
  	var sqlContext = {};
	var sql = 'SELECT unit_id, unit_name, race, mineral_cost, vespene_cost, build_time, life, shields, armor ' +
  	'FROM unit ';
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
	  	sql += 'GROUP BY unit_id, unit_name';
	  	if (sort == 'Unit Name') sql += ' ORDER BY unit_name';
	  	else if (sort == 'Race') sql += ' ORDER BY race';
	  	else if (sort == 'All') sql += ' ORDER BY race, unit_name';
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

module.exports.route_GET_units = function(req, res, next, pool) {
	var unitHelper = require('./unit.js');
	var context = {};
	if (req.session.unitSel == undefined) {
		req.session.unitSel = 'None';
	}
	if (req.session.unitSelVal == undefined) {
		req.session.unitSelVal = '1';
	}
	if (req.session.unitSort == undefined) {
		req.session.unitSort = 'None';
	}
	context.layout = 'unit-layout';
    unitHelper.getUnit(res, context, complete, req.session.unitSel, req.session.unitSelVal, req.session.unitSort, pool);
    function complete() {
    	context.results.forEach( function(e) {
    		if (e.shields == null) {
    			e.shields = 'null';
    		}
    	});
  		res.render('unit', context);
    }    	
}

module.exports.route_POST_units = function(req, res) {	
	if (req.body['ValUpdate']) {
		if (req.body['Select']) {
			req.session.unitSel = req.body['Select'];
		} else if (req.body['SelectVal']) {
			req.session.unitSelVal = req.body['SelectVal'];
		} else if (req.body['Sort']) {
			req.session.unitSort = req.body['Sort'];
		}
    	res.end();
    }
	
	if (req.body['GetCurrSel']) {
		res.send(req.session.unitSel);
	} else if (req.body['GetCurrSelVal']) {
		res.send(req.session.unitSelVal);
	} else if (req.body['GetCurrSort']) {
		res.send(req.session.unitSort);
	}
}