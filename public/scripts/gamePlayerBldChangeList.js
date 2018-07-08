/*************************************************************
** File Name: gamePlayerBldChangeList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-player-bld-change'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bldValues();
  bindBack();
});

function bldValues() { // Set current building quantities for player in game.
  var req = new XMLHttpRequest();
  var package = {'GetGameAndPlayerId': 1}
  req.open('POST', '/game-player-bld-change', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      values = JSON.parse(req.responseText);
      gameId = values.game_id;
      playerId = values.player_id;
      var reqGPB = new XMLHttpRequest();
      var packageGPB = {'GetGamePlayerBld': 1};
      packageGPB.game_id = gameId;
      packageGPB.player_id = playerId;
      reqGPB.open('POST', '/game-player-bldunit', true);
      reqGPB.setRequestHeader('Content-Type', 'application/json');
      reqGPB.addEventListener('load', function() {
        if (reqGPB.status >= 200 && reqGPB.status < 400) {
          var buildingValues = JSON.parse(reqGPB.responseText);
          var input;
          buildingValues.building.forEach( function(e) {
            input = document.getElementById("newQuantity" + e.building_id);
            input.value = e.quantity;
          });
        } else {
          console.log("Error in network request: " + reqGPB.statusText);
        }
      });
      reqGPB.send(JSON.stringify(packageGPB));
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindBack() { // Event handler for the back button.
  var button = document.getElementById('Back');
  button.addEventListener('click', function(event) {
    window.location.href = '/game-player-bldunit';
    event.preventDefault();
  });
}

