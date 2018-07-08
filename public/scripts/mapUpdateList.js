/*************************************************************
** File Name: mapUpdateList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/map-update'
**   webpage.  
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  typeVal();
  bindEditButton();
  warningTimer();
});

function typeVal() { // Set map type values.
  var select = document.getElementById('newType');
  var req = new XMLHttpRequest();
  var package = {'GetMap': 1};
  req.open('POST', '/maps', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      select.value = req.responseText;
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
} 

function bindEditButton() { // Event handler for the update button.
  var button = document.getElementById('EditButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Edit Request': 1};
    tube.name = document.getElementById('newName').value;
    tube.type = document.getElementById('newType').value;
    tube.horizontal = document.getElementById('newHorizontal').value;
    tube.vertical = document.getElementById('newVertical').value;
    tube.designer = document.getElementById('newDesigner').value;
    tube.tile_set = document.getElementById('newTileSet').value;
    req.open('POST', '/maps', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        if (req.responseText.length < 1000) {
          window.location.href = '/map-update';
        } else {
          window.location.href = '/maps';
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