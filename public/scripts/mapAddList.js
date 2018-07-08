/*************************************************************
** File Name: mapAddList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/map-add'
**   webpage.  
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindAddButton();
  warningTimer();
}); 

function bindAddButton() { // Event handler for the add button.
  var button = document.getElementById('AddButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Add Item': 1};
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
          window.location.href = '/map-add';
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