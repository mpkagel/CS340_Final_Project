/*************************************************************
** File Name: gamePlayerUnitChangeList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-player-unit-change'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  unitValues();
  bindBack();
});

function unitValues() { // Set unit quantity values.
  var req = new XMLHttpRequest();
  var package = {'GetGameAndPlayerId': 1}
  req.open('POST', '/game-player-unit-change', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      values = JSON.parse(req.responseText);
      gameId = values.game_id;
      playerId = values.player_id;
      var reqGPU = new XMLHttpRequest();
      var packageGPU = {'GetGamePlayerUnit': 1};
      packageGPU.game_id = gameId;
      packageGPU.player_id = playerId;
      reqGPU.open('POST', '/game-player-bldunit', true);
      reqGPU.setRequestHeader('Content-Type', 'application/json');
      reqGPU.addEventListener('load', function() {
        if (reqGPU.status >= 200 && reqGPU.status < 400) {
          var unitValues = JSON.parse(reqGPU.responseText);
          var input;
          unitValues.unit.forEach( function(e) {
            input = document.getElementById("newQuantity" + e.unit_id);
            input.value = e.quantity;
          });
        } else {
          console.log("Error in network request: " + reqGPU.statusText);
        }
      });
      reqGPU.send(JSON.stringify(packageGPU));
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

