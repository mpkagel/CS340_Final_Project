/*************************************************************
** File Name: gamePlayerBldUnitList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-player-bldunit'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindChangeButtonBldUnit();
  bindBack();
});

function bindChangeButtonBldUnit() { // Event handler for the update buildings and update units buttons.
  var req = new XMLHttpRequest();
  var package = {'GetGamePlayerId': 1}
  req.open('POST', '/game-player', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      gameId = JSON.parse(req.responseText);
      var reqGP = new XMLHttpRequest();
      var packageGP = {'GetGamePlayers': gameId};
      reqGP.open('POST', '/game-player', true);
      reqGP.setRequestHeader('Content-Type', 'application/json');
      reqGP.addEventListener('load', function() {
        if (reqGP.status >= 200 && reqGP.status < 400) {
          var playerValues = JSON.parse(reqGP.responseText);
          var button;
          playerValues.player.forEach( function(e) {
            button = document.getElementById("ChangeButtonBld" + e.player_id);
            button.addEventListener('click', function(event) {
              var reqList = new XMLHttpRequest();
              var packageList = {'Game Id': e.game_id, 'Player Id': e.player_id};
              reqList.open('POST', '/game-player-bld-change', true);
              reqList.setRequestHeader('Content-Type', 'application/json');
              reqList.addEventListener('load', function() {
                if (reqList.status >= 200 && reqList.status < 400) {
                  window.location.href = '/game-player-bld-change';
                } else {
                  console.log("Error in network request: " + reqList.statusText);
                }
              });
              reqList.send(JSON.stringify(packageList));
              event.preventDefault();
            });
            button = document.getElementById("ChangeButtonUnit" + e.player_id);
            button.addEventListener('click', function(event) {
              var reqList2 = new XMLHttpRequest();
              var packageList2 = {'Game Id': e.game_id, 'Player Id': e.player_id};
              reqList2.open('POST', '/game-player-unit-change', true);
              reqList2.setRequestHeader('Content-Type', 'application/json');
              reqList2.addEventListener('load', function() {
                if (reqList2.status >= 200 && reqList2.status < 400) {
                  window.location.href = '/game-player-unit-change';
                } else {
                  console.log("Error in network request: " + reqList2.statusText);
                }
              });
              reqList2.send(JSON.stringify(packageList2));
              event.preventDefault();
            });
          });
        } else {
          console.log("Error in network request: " + reqGP.statusText);
        }
      });
      reqGP.send(JSON.stringify(packageGP));
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindBack() { // Event handler for the back button.
  var button = document.getElementById('Back');
  button.addEventListener('click', function(event) {
    window.location.href = '/game-player';
    event.preventDefault();
  });
}



