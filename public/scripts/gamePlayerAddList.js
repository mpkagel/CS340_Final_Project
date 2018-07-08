/*************************************************************
** File Name: gamePlayerAddList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-player-add'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  playerVal();
  bindBack();
  bindAddButton();
  warningTimer();
});

function playerVal() { // Set player pulldown values.
  var select = document.getElementById('newPlayer');
  var req = new XMLHttpRequest();
  var package = {'GetGamePlayerId': 1};
  req.open('POST', 'game-player', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      gameId = req.responseText;
      var reqGP = new XMLHttpRequest();
      var packageGP = {'GetGamePlayers': gameId};
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
                  if (e.player_id == p && e.player_id) {
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

function bindAddButton() { // Event handler for the add button.
  var button = document.getElementById('AddButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Add Item': 1};
    tube.player = document.getElementById('newPlayer').value;
    tube.outcome = document.getElementById('newOutcome').value;
    tube.race = document.getElementById('newRace').value;
    tube.team = document.getElementById('newTeam').value;
    req.open('POST', '/game-player', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        if (req.responseText.length < 500) {
          window.location.href = '/game-player-add';
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