/*************************************************************
** File Name: playerGameList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/player-game'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindGamePlayerLists();
});

function bindGamePlayerLists() { // Event handler to make each game in the player's game list
  var req = new XMLHttpRequest(); // go to that game's player list.
  var package = {'GetPlayerGameId': 1};
  req.open('POST', '/player-game', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      playerId = JSON.parse(req.responseText);
      var reqPG = new XMLHttpRequest();
      var packagePG = {'GetPlayerGames': playerId};
      reqPG.open('POST', '/player-game', true);
      reqPG.setRequestHeader('Content-Type', 'application/json');
      reqPG.addEventListener('load', function() {
        if (reqPG.status >= 200 && reqPG.status < 400) {
          var gameValues = JSON.parse(reqPG.responseText);
          var button;
          gameValues.games.forEach( function(e) {
            button = document.getElementById("list" + e.game_id);
            button.addEventListener('click', function(event) {
              var reqList = new XMLHttpRequest();
              var packageList = {'Game Id': e.game_id};
              reqList.open('POST', '/game-player', true);
              reqList.setRequestHeader('Content-Type', 'application/json');
              reqList.addEventListener('load', function() {
                if (reqList.status >= 200 && reqList.status < 400) {
                  window.location.href = '/game-player';
                } else {
                  console.log("Error in network request: " + reqList.statusText);
                }
              });
              reqList.send(JSON.stringify(packageList));
              event.preventDefault();
            });
          });
        } else {
          console.log("Error in network request: " + req.statusText);
        }
      });
      reqPG.send(JSON.stringify(packagePG));
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}
