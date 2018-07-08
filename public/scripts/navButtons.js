/*************************************************************
** File Name: navButtons.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the Game, Map,
**   Player, Building, and Unit nav buttons in the webpages that
**   have them.
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindGameButton();
  bindMapButton();
  bindPlayerButton();
  bindBuildingButton();
  bindUnitButton();
});

function bindGameButton() {
  var button = document.getElementById('game-button');
  button.addEventListener('click', function(event) {
    window.location.href = '/';
    event.preventDefault();
  });
}

function bindMapButton() {
  var button = document.getElementById('map-button');
  button.addEventListener('click', function(event) {
    window.location.href = '/maps';
    event.preventDefault();
  });
}

function bindPlayerButton() {
  var button = document.getElementById('player-button');
  button.addEventListener('click', function(event) {
    window.location.href = '/players';
    event.preventDefault();
  });
}    

function bindBuildingButton() {
  var button = document.getElementById('building-button');
  button.addEventListener('click', function(event) {
    window.location.href = '/buildings';
    event.preventDefault();
  });
}     

function bindUnitButton() {
  var button = document.getElementById('unit-button');
  button.addEventListener('click', function(event) {
    window.location.href = '/units';
    event.preventDefault();
  });
}       
