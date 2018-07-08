/*************************************************************
** File Name: gamePlayerUpdateList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-player-update'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  playerRaceVal();
  bindBack();
  bindEditButton();
  warningTimer();
});

function playerRaceVal() { // Set player and race pulldown values.
  var select = document.getElementById('newPlayer');
  var select2 = document.getElementById('newRace');
  var req = new XMLHttpRequest();
  var package = {'GetGamePlayerId': 1};
  req.open('POST', 'game-player', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      gameId = req.responseText;
      var reqPla = new XMLHttpRequest();
      var packagePla = {'GetGamePlayer': 1};
      reqPla.open('POST', 'game-player-update', true);
      reqPla.setRequestHeader('Content-Type', 'application/json');
      reqPla.addEventListener('load', function () {
        if(reqPla.status >= 200 && reqPla.status < 400) {
          var playerValue = JSON.parse(reqPla.responseText);
          var reqGP = new XMLHttpRequest();
          var packageGP = {'GetGamePlayers': playerValue.player[0].game_id};
          reqGP.open('POST', '/game-player', true);
          reqGP.setRequestHeader('Content-Type', 'application/json');
          reqGP.addEventListener('load', function() {
            if(reqGP.status >= 200 && reqGP.status < 400) {
              var gamePlayerValues = JSON.parse(reqGP.responseText);
              var checkIdArray = [];
              gamePlayerValues.player.forEach( function(e) {
                checkIdArray.push(e.player_id);
              });
              var reqList = new XMLHttpRequest();
              var packageList = {'GetPlayers': 1};
              reqList.open('POST', '/players', true);
              reqList.setRequestHeader('Content-Type', 'application/json');
              reqList.addEventListener('load', function() {
                if(reqList.status >= 200 && reqList.status < 400) {
                  var playerValues = JSON.parse(reqList.responseText);
                  var match = 0;
                  playerValues.results.forEach( function(e) {
                    checkIdArray.forEach( function(p) {
                      if (e.player_id == p && e.player_id != playerValue.player[0].player_id) {
                        match = 1;
                      } 
                    }); 
                    if (!match) {
                      var option = document.createElement('option');
                      option.textContent = e.player_name;
                      option.value = JSON.stringify(e.player_id);
                      select.appendChild(option);
                    }
                    match = 0;
                  });
                  select.value = playerValue.player[0].player_id;
                  select2.value = playerValue.player[0].race;                 
                } else {
                  console.log("Error in network request: " + reqList.statusText);
                }
              });
              reqList.send(JSON.stringify(packageList));
            } else {
              console.log("Error in network request: " + reqGP.statusText);
            }
          });
          reqGP.send(JSON.stringify(packageGP));
        } else {
          console.log("Error in network request: " + reqPla.statusText);
        }
      });
      reqPla.send(JSON.stringify(packagePla));
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

function bindEditButton() { // Event handler for the add button.
  var button = document.getElementById('EditButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Edit Request': 1};
    tube.player = document.getElementById('newPlayer').value;
    tube.outcome = document.getElementById('newOutcome').value;
    tube.race = document.getElementById('newRace').value;
    tube.team = document.getElementById('newTeam').value;
    req.open('POST', '/game-player', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        if (req.responseText.length < 500) {
          window.location.href = '/game-player-update';
        } else {
          window.location.href = '/game-player';
        }
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(tube));
    event.preventDefault();
  });
}

function warningTimer() { // Warning only remains for specified time.
  setTimeout( function() {
    var header = document.getElementById("warningSql");
    if (header) {
       var parent = header.parentNode;
       parent.removeChild(header);
    }
  }, 4500);
}
