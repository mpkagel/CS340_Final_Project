/*************************************************************
** File Name: gameList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/' (root)
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindSelectBy();
  bindSelectValueBy();
  bindSortBy();
  bindGameValues();
  bindAdd();
  warningTimer();
});

function bindSelectBy() { // Set selection pulldown values.
  var select = document.getElementById('game-select-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSel': 1};
  reqSess.open('POST', '/', true);
  reqSess.setRequestHeader('Content-Type', 'application/json');
  reqSess.addEventListener('load', function() {
    if(reqSess.status >= 200 && reqSess.status < 400) {
      if (select.value) {
        select.value = reqSess.responseText;
        selectValueMod(select.value);
      }
    } else {
      console.log("Error in network request: " + reqSess.statusText);
    }
  });
  reqSess.send(JSON.stringify(packageSess));
  select.addEventListener('change', function(event) {
    var selection = select.value;
    var req = new XMLHttpRequest();
    var package = {'ValUpdate': 1, 'Select': selection};
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        clearSelVal(select.value);
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
} 

function bindSelectValueBy() { // Set selection value pulldown values.
  var select = document.getElementById('game-select-value-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSelVal': 1};
  reqSess.open('POST', '/', true);
  reqSess.setRequestHeader('Content-Type', 'application/json');
  reqSess.addEventListener('load', function() {
    if (reqSess.status >= 200 && reqSess.status < 400) {
      select.value = reqSess.responseText;
    } else {
      console.log("Error in network request: " + reqSess.statusText);
    }
  });
  reqSess.send(JSON.stringify(packageSess));
  select.addEventListener('change', function(event) {
    var selection = select.value;
    var req = new XMLHttpRequest();
    var package = {'ValUpdate': 1, 'SelectVal': selection};
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        window.location.href = '/';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
} 

function bindSortBy() { // Set sort value pulldown values.
  var select = document.getElementById('game-sort-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSort': 1};
  reqSess.open('POST', '/', true);
  reqSess.setRequestHeader('Content-Type', 'application/json');
  reqSess.addEventListener('load', function() {
    if (reqSess.status >= 200 && reqSess.status < 400) {
      select.value = reqSess.responseText;
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  reqSess.send(JSON.stringify(packageSess));
  select.addEventListener('change', function(event) {
    var selection = select.value;
    var req = new XMLHttpRequest();
    var package = {'ValUpdate': 1, 'Sort': selection};
    req.open('POST', '/', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        window.location.href = '/';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
}

function selectValueMod(val) { // Assists bindSelectBy() in populating values.
  var select = document.getElementById('game-select-value-by');
  var children = select.childNodes;
  var loopNum = children.length;
  for (var i = 1; i <= loopNum - 1; i++) {
    select.removeChild((select.firstChild).nextSibling);
  }
  if (val == 'Game Type') {
    var option1 = document.createElement('option');
    option1.textContent = 'All';
    option1.value = 'All';
    var option2 = document.createElement('option');
    option2.textContent = '1v1';
    option2.value = '1v1';
    var option3 = document.createElement('option');
    option3.textContent = '2v2';
    option3.value = '2v2';
    var option4 = document.createElement('option');
    option4.textContent = '3v3';
    option4.value = '3v3';
    var option5 = document.createElement('option');
    option5.textContent = '4v4';
    option5.value = '4v4';
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    select.appendChild(option5);
    updSelVal();
  } else if (val == 'Map Name') {
    var option1 = document.createElement('option');
    option1.textContent = 'All';
    option1.value = '1';
    select.appendChild(option1);
    var option2 = document.createElement('option');
    option2.textContent = 'Null';
    option2.value = '2';
    select.appendChild(option2);
    var req = new XMLHttpRequest();
    var package = {'GetMaps': 1};
    req.open('POST', '/maps', true);
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
        updSelVal();
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
  } else if (val == 'None') {
    clearSelVal(0);
  }
}

function updSelVal() { // Update selection value.
  var select = document.getElementById('game-select-value-by');
  var req = new XMLHttpRequest();
  var package = {'GetCurrSelVal': 1};
  req.open('POST', '/', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      select.value = req.responseText;
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function clearSelVal(val) { // Clear selection value.
  var select = document.getElementById('game-select-value-by');
  var req = new XMLHttpRequest();
  if (val == 'Game Type') {
    var package = {'ValUpdate': 1, 'SelectVal': 'All'};
  } else if (val == 'Map Name') {
    var package = {'ValUpdate': 1, 'SelectVal': '1'};
  } else {
    var package = {'ValUpdate': 1, 'SelectVal': '1'};
  } 
  req.open('POST', '/', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      if (val != 0) {
        window.location.href = '/';    
      }
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindGameValues() { // Event handler for each game's player list.
  var req = new XMLHttpRequest(); // Gets game list for update, delete, and player length check.
  var package = {'GetGames': 1};
  req.open('POST', '/', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var gameValues = JSON.parse(req.responseText);
      var button;
      gameValues.results.forEach( function(e) {
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
      bindUpdate(gameValues);
      bindDelete(gameValues);
      fillPCount(gameValues);
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindAdd() { // Event handler for the add button.
  var button = document.getElementById('add');
  button.addEventListener('click', function(event) {
    window.location.href = '/game-add';
    event.preventDefault();
  });
}

function bindUpdate(arr) { // Event handler for the update button.
  var button;
  arr.results.forEach( function(e) {
    button = document.getElementById("upd" + e.game_id);
    button.addEventListener('click', function(event) {
      var reqList = new XMLHttpRequest();
      var packageList = {'Game Id': e.game_id};
      reqList.open('POST', '/game-update', true);
      reqList.setRequestHeader('Content-Type', 'application/json');
      reqList.addEventListener('load', function() {
        if (reqList.status >= 200 && reqList.status < 400) {
          window.location.href = '/game-update';
        } else {
          console.log("Error in network request: " + reqList.statusText);
        }
      });
      reqList.send(JSON.stringify(packageList));
      event.preventDefault();
    });
  });
}

function bindDelete(arr) { // Event handler for the delete button.
  var button;
  arr.results.forEach( function(e) {
    button = document.getElementById("del" + e.game_id);
    button.addEventListener('click', function(event) {
      var reqList = new XMLHttpRequest();
      var packageList = {'Game Id': e.game_id};
      reqList.open('POST', '/game-update', true);
      reqList.setRequestHeader('Content-Type', 'application/json');
      reqList.addEventListener('load', function() {
        if (reqList.status >= 200 && reqList.status < 400) {
          window.location.href = '/game-delete';
        } else {
          console.log("Error in network request: " + reqList.statusText);
        }
      });
      reqList.send(JSON.stringify(packageList));
      event.preventDefault();
    });
  });  
}

function fillPCount(arr) { // Populates a box with different values depending on whether the game type matches
  var req = new XMLHttpRequest(); // the player count for the game.
  var package = {'GetAllGamePlayers': 1};
  package.games = arr;
  req.open('POST', '/game-player', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      gamePlayerList = JSON.parse(req.responseText);
      var pCountCell;
      arr.results.forEach( function(e, i) {
        pCountCell = document.getElementById("p_count" + gamePlayerList.games[i].game_id);
        var gplLength = gamePlayerList.games[i].player.length;
        correctLength = findLength(gamePlayerList.games[i].game_type);
        if (gplLength != correctLength) {
          pCountCell.style.backgroundColor = 'red';
          pCountCell.textContent = 'X - Incorrect';
        } else if (gplLength == correctLength) {
          pCountCell.style.backgroundColor = '#00FF00';
          pCountCell.textContent = 'Matches Game Type';
        } else {
          pCountCell.style.backgroundColor = 'grey';
          pCountCell.textContent = 'Calc Error';
        }
      });
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
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

function warningTimer() { // Warning only remains for specified time.
  setTimeout( function() {
    var header = document.getElementById('warning');
    if (header) {
       var parent = header.parentNode;
       parent.removeChild(header);
    }
  }, 4500);
}
