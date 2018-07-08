/*************************************************************
** File Name: gameUpdateList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-update'
**   webpage.  
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindType();
  bindEditButton();
  warningTimer();
});

function bindType() { // Set game type pulldown values.
  var select = document.getElementById('newType');
  var req = new XMLHttpRequest();
  var package = {'GetCurrSelVal': 1};
  req.open('POST', '/game-update', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      select.value = req.responseText;
      changeMapValInit();
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
  select.addEventListener('change', function(event) {
    var selection = select.value;
    var req = new XMLHttpRequest();
    var package = {'ValUpdate': 1, 'SelectVal': selection};
    req.open('POST', '/game-update', true);
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

function changeMapValInit() { // Change map pulldown in response to a game type change.
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
  req.open('POST', '/game-update', true);
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
      var reqMap = new XMLHttpRequest();
      var packageMap = {'GetGame': 1};
      reqMap.open('POST', '/', true);
      reqMap.setRequestHeader('Content-Type', 'application/json');
      reqMap.addEventListener('load', function() {
        if (reqMap.status >= 200 && reqMap.status < 400) {
          select.value = reqMap.responseText;
        } else {
          console.log("Error in network request: " + reqMap.statusText);
        }
      });
      reqMap.send(JSON.stringify(packageMap));
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
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
  req.open('POST', '/game-update', true);
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

function bindEditButton() { // Event handler for the update button.
  var button = document.getElementById('EditButton');
  button.addEventListener('click', function(event) {
    var req = new XMLHttpRequest();
    var tube = {'Edit Request': 1};
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
          window.location.href = '/game-update';
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


