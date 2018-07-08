/*************************************************************
** File Name: gamePlayerList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-player'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindUpdateDeleteAddBldUnit();
  warningTimer();
});

function bindUpdateDeleteAddBldUnit() { // Event handler for update button, calls bindDelete().
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
            button = document.getElementById("upd" + e.player_id);
            button.addEventListener('click', function(event) {
              var reqList = new XMLHttpRequest();
              var packageList = {'Game Id': e.game_id, 'Player Id': e.player_id};
              reqList.open('POST', '/game-player-update', true);
              reqList.setRequestHeader('Content-Type', 'application/json');
              reqList.addEventListener('load', function() {
                if (reqList.status >= 200 && reqList.status < 400) {
                  window.location.href = '/game-player-update';
                } else {
                  console.log("Error in network request: " + reqList.statusText);
                }
              });
              reqList.send(JSON.stringify(packageList));
              event.preventDefault();
            });
          });
          bindDelete(gameId, playerValues);
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

function bindDelete(gameId, playerValues) { // Event handler for the delete button, calls createAdd.
  var button;
  playerValues.player.forEach( function(e) {
    button = document.getElementById('del' + e.player_id);
    button.addEventListener('click', function(event) {
      var req = new XMLHttpRequest();
      var package = {'Delete Item': e.player_id};
      req.open('POST', '/game-player', true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        window.location.href = 'game-player';
      }, true);
      req.send(JSON.stringify(package));
    });
  });
  createAdd(gameId, playerValues);
  bindBldUnit(gameId); 
}

function createAdd(gameId, playerValues) { // Adds an add button to the gameplayer table contingent upon
  var reqType = new XMLHttpRequest(); // whether one is necessary to meet the game type number of player condition.
  var packageType = {'GetGameType': gameId};
  reqType.open('POST', '/', true);
  reqType.setRequestHeader('Content-Type', 'application/json');
  reqType.addEventListener('load', function() {
    if (reqType.status >= 200 && reqType.status < 400) {
      gameType = reqType.responseText;
      var numPlayers = findLength(gameType);
      if (playerValues.player.length < numPlayers) {
        var TBody = document.getElementById('player-tbody');
        var Row = document.createElement('tr');
        var Cols = [];
        for (var i = 1; i <= 7; i++) {
          Cols[i] = document.createElement('td');
          Row.appendChild(Cols[i]);
        }
        var button = document.createElement('button');
        button.textContent = 'Add Player';
        button.addEventListener('click', function() {
          var reqAdd = new XMLHttpRequest();
          var packageAdd = {'Game Id': gameId};
          reqAdd.open('POST', 'game-player-add', true);
          reqAdd.setRequestHeader('Content-Type', 'application/json');
          reqAdd.addEventListener('load', function() {
            if (reqAdd.status >= 200 && reqAdd.status < 400) {
              window.location.href = '/game-player-add';
            } else {
              console.log("Error in network request: " + reqAdd.statusText);
            }
          });
          reqAdd.send(JSON.stringify(packageAdd));
        });
        Cols[1].appendChild(button);
        TBody.appendChild(Row);
      }
    } else {
      console.log("Error in network request: " + reqType.statusText);
    }
  });
  reqType.send(JSON.stringify(packageType));  
}

function findLength(val) { // Return the number of players as a function of game type.
  if (val == '4v4') {
    return 8;
  } else if (val == '3v3') {
    return 6;
  } else if (val == '2v2') {
    return 4;
  } else if (val == '1v1') {
    return 2;
  }
}

function bindBldUnit(gameId) { // Event handler for the building unit list button.
  var button = document.getElementById('bldUnit');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var package = {'Game Id': gameId};
    req.open('POST', '/game-player-bldunit', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        window.location.href = '/game-player-bldunit';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
}

function warningTimer() { // Warning only remains for specified time.
  setTimeout( function() {
    var header = document.getElementById('warning');
    if (header) {
       var parent = header.parentNode;
       parent.removeChild(header);
    }
  }, 4500);
}
