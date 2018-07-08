/*************************************************************
** File Name: playerUpdateList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/player-update'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindEditButton();
  warningTimer();
}); 

function bindEditButton() { // Event handler for the update button.
  var button = document.getElementById('EditButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Edit Request': 1};
    tube.name = document.getElementById('newName').value;
    tube.wins = document.getElementById('newWins').value;
    tube.losses = document.getElementById('newLosses').value;
    req.open('POST', '/players', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        if (req.responseText.length < 1000) {
          window.location.href = '/player-update';
        } else {
          window.location.href = '/players';
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