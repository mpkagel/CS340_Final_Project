/*************************************************************
** File Name: sc2game_tracker.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file that serves database
**   information and webpages to the client.
*************************************************************/
var express = require('express');
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  dateStrings : true,
  host        : '****',
  user        : '****',
  password    : '****',
  database    : '****' 
});
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'handlebars');
app.set('port', ****);
app.use(express.static('public'));
app.use(session({
	secret: 'nosecrets',
	resave: false,
	saveUninitialized: true
}));

var buildingHelper = require('./public/modules/building.js');
var gameHelper = require('./public/modules/game.js');
var mapHelper = require('./public/modules/map.js');
var playerHelper = require('./public/modules/player.js');
var gamePlayerHelper = require('./public/modules/gamePlayer.js');
var gamePlayerBuildingHelper = require('./public/modules/gamePlayerBuilding.js');
var gamePlayerUnitHelper = require('./public/modules/gamePlayerUnit.js');
var unitHelper = require('./public/modules/unit.js');

app.get('/', function(req, res, next) {
	gameHelper.route_GET_root(req, res, next, pool);
});

app.post('/', function(req, res) {
	gameHelper.route_POST_root(req, res, pool);
});

app.get('/game-add', function(req, res, next) {
	gameHelper.route_GET_gameAdd(req, res, next);
});

app.post('/game-add', function(req, res) {
	gameHelper.route_POST_gameAdd(req, res, pool);
});

app.get('/game-update', function(req, res, next) {
	gameHelper.route_GET_gameUpdate(req, res, next, pool);
});

app.post('/game-update', function(req, res) {
	gameHelper.route_POST_gameUpdate(req, res, pool);
});

app.get('/game-delete', function(req, res, next) {
	gameHelper.route_GET_gameDelete(req, res, next, pool);
});

app.post('/game-delete', function(req, res) {
	gameHelper.route_POST_gameDelete(req, res);
});

app.get('/maps', function(req, res, next) {
	mapHelper.route_GET_maps(req, res, next, pool);	
});

app.post('/maps', function(req, res) {
	mapHelper.route_POST_maps(req, res, pool);
});

app.get('/map-add', function(req, res, next) {
	mapHelper.route_GET_mapAdd(req, res, next);
});

app.get('/map-update', function(req, res, next) {
	mapHelper.route_GET_mapUpdate(req, res, next, pool);
});

app.post('/map-update', function(req, res) {
	mapHelper.route_POST_mapUpdate(req, res);
});

app.get('/game-player', function(req, res, next) {
	gamePlayerHelper.route_GET_gamePlayer(req, res, next, pool);
});

app.post('/game-player', function(req, res) {
	gamePlayerHelper.route_POST_gamePlayer(req, res, pool);
});

app.get('/game-player-add', function(req, res, next) {
	gamePlayerHelper.route_GET_gamePlayerAdd(req, res, next, pool);
});

app.post('/game-player-add', function(req, res) {
	gamePlayerHelper.route_POST_gamePlayerAdd(req, res, pool);
});

app.get('/game-player-update', function(req, res, next) {
	gamePlayerHelper.route_GET_gamePlayerUpdate(req, res, next, pool);
});

app.post('/game-player-update', function(req, res) {
	gamePlayerHelper.route_POST_gamePlayerUpdate(req, res, pool);
});

app.get('/game-player-bldunit', function(req, res, next) {
	gamePlayerHelper.route_GET_gamePlayerBldUnit(req, res, next, pool);
});

app.post('/game-player-bldunit', function(req, res) {
	gamePlayerHelper.route_POST_gamePlayerBldUnit(req, res, pool);
});

app.get('/game-player-bld-change', function(req, res, next) {
	gamePlayerBuildingHelper.route_GET_gamePlayerBldChange(req, res, next, pool);
});

app.post('/game-player-bld-change', function(req, res) {
	gamePlayerBuildingHelper.route_POST_gamePlayerBldChange(req, res);
});

app.get('/game-player-unit-change', function(req, res, next) {
	gamePlayerUnitHelper.route_GET_gamePlayerUnitChange(req, res, next, pool);
});

app.post('/game-player-unit-change', function(req, res) {
	gamePlayerUnitHelper.route_POST_gamePlayerUnitChange(req, res);
});

app.get('/player-game', function(req, res, next) {
	gamePlayerHelper.route_GET_playerGame(req, res, next, pool);	
});

app.post('/player-game', function(req, res) {
	gamePlayerHelper.route_POST_playerGame(req, res, pool);
});

app.get('/players', function(req, res, next) {
	playerHelper.route_GET_players(req, res, next, pool);  	
});

app.post('/players', function(req, res) {
	playerHelper.route_POST_players(req, res, pool);
});

app.get('/player-add', function(req, res, next) {
	playerHelper.route_GET_playerAdd(req, res, next);
});

app.get('/player-update', function(req, res, next) {
	playerHelper.route_GET_playerUpdate(req, res, next, pool);
});

app.post('/player-update', function(req, res) {
	playerHelper.route_POST_playerUpdate(req, res);
});

app.get('/buildings', function(req, res, next) {
	buildingHelper.route_GET_buildings(req, res, next, pool);
});

app.post('/buildings', function(req, res) {
	buildingHelper.route_POST_buildings(req, res);
});

app.get('/units', function(req, res, next) {
	unitHelper.route_GET_units(req, res, next, pool);	
});

app.post('/units', function(req, res) {	
	unitHelper.route_POST_units(req, res);
});

app.use(function(req,res) {
  	res.status(404);
  	res.render('404');
});

app.use(function(err, req, res, next) {
  	console.error(err.stack);
  	res.type('plain/text');
  	res.status(500);
  	res.render('500');
});

app.listen(app.get('port'), function() {
  	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
