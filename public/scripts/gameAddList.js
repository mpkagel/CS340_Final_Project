/*************************************************************
** File Name: gameAddList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-add'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindType();
  bindAddButton();
  warningTimer();
});

function bindType() { // Set game type pulldown values.
  var select = document.getElementById('newType');
  var selection = select.value;
  var req = new XMLHttpRequest();
  var package = {'ValUpdate': 1, 'SelectVal': selection};
  req.open('POST', '/game-add', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      changeMapVal();
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
  select.addEventListener('change', function(event) {
    var selection = select.value;
    var req = new XMLHttpRequest();
    var package = {'ValUpdate': 1, 'SelectVal': selection};
    req.open('POST', '/game-add', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        changeMapVal();
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
} 


function changeMapVal() { // Change map pulldown in response to a game type change.
  var select = document.getElementById('newMap');
  var children = select.childNodes;
  var loopNum = children.length;
  for (var i = 1; i <= loopNum - 1; i++) {
    select.removeChild((select.firstChild).nextSibling);
  }
  var option = document.createElement('option');
  option.textContent = 'None';
  option.value = '1';
  select.appendChild(option);
  var req = new XMLHttpRequest();
  var package = {'GetMaps': 1};
  req.open('POST', '/game-add', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var mapValues = JSON.parse(req.responseText);
      mapValues.results.forEach( function(e) {
        option = document.createElement('option');
        option.textContent = e.map_name;
        option.value = JSON.stringify(e.map_id);
        select.appendChild(option);
      });
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindAddButton() { // Event handler for the add button.
  var button = document.getElementById('AddButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Add Item': 1};
    tube.name = document.getElementById('newName').value;
    tube.type = document.getElementById('newType').value;
    tube.time = document.getElementById('newTime').value;
    tube.date = document.getElementById('newDate').value;
    tube.map = document.getElementById('newMap').value;
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        if (req.responseText.length < 1000) {
          window.location.href = '/game-add';
        } else {
          window.location.href = '/';
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