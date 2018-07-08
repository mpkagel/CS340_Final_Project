/*************************************************************
** File Name: playerList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/players'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindSelectBy();
  bindSelectValueBy();
  bindSortBy();
  bindAdd();
  bindUpdateDelete();
  bindPlayerGamesLists();
});

function bindSelectBy() { // Set selection pulldown values.
  var select = document.getElementById('player-select-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSel': 1};
  reqSess.open('POST', '/players', true);
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
    req.open('POST', '/players', true);
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
  var select = document.getElementById('player-select-value-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSelVal': 1};
  reqSess.open('POST', '/players', true);
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
    req.open('POST', '/players', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        window.location.href = '/players';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
} 

function bindSortBy() { // Set sort value pulldown values.
  var select = document.getElementById('player-sort-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSort': 1};
  reqSess.open('POST', '/players', true);
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
    req.open('POST', '/players', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        window.location.href = '/players';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
}

function selectValueMod(val) { // Assists bindSelectBy() in populating values.
  var select = document.getElementById('player-select-value-by');
  var children = select.childNodes;
  var loopNum = children.length;
  for (var i = 1; i <= loopNum - 1; i++) {
    select.removeChild((select.firstChild).nextSibling);
  }
  if (val == 'Player Name') {
    var option = document.createElement('option');
    option.textContent = 'All';
    option.value = '1';
    select.appendChild(option);
    var req = new XMLHttpRequest();
    var package = {'GetPlayers': 1};
    req.open('POST', '/players', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        var playerValues = JSON.parse(req.responseText);
        playerValues.results.forEach( function(e) {
          option = document.createElement('option');
          option.textContent = e.player_name;
          option.value = JSON.stringify(e.player_id);
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

function updSelVal() { // Update selection values.
  var select = document.getElementById('player-select-value-by');
  var req = new XMLHttpRequest();
  var package = {'GetCurrSelVal': 1};
  req.open('POST', '/players', true);
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
  var select = document.getElementById('player-select-value-by');
  var req = new XMLHttpRequest();
  var package = {'ValUpdate': 1, 'SelectVal': '1'};
  req.open('POST', '/players', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      if (val != 0) {
        window.location.href = '/players';    
      }
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindAdd() { // Event handler for the add button.
  var button = document.getElementById('add');
  button.addEventListener('click', function(event) {
    window.location.href = '/player-add';
    event.preventDefault();
  });
}

function bindUpdateDelete() { // Event handler for the update button, calls bindDelete().
  var req = new XMLHttpRequest();
  var package = {'GetPlayersSpecific': 1};
  req.open('POST', '/players', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var playerValues = JSON.parse(req.responseText);
      var button;
      playerValues.results.forEach( function(e) {
        button = document.getElementById("upd" + e.player_id);
        button.addEventListener('click', function(event) {
          var reqList = new XMLHttpRequest();
          var packageList = {'Player Id': e.player_id};
          reqList.open('POST', '/player-update', true);
          reqList.setRequestHeader('Content-Type', 'application/json');
          reqList.addEventListener('load', function() {
            if (reqList.status >= 200 && reqList.status < 400) {
              window.location.href = '/player-update';
            } else {
              console.log("Error in network request: " + reqList.statusText);
            }
          });
          reqList.send(JSON.stringify(packageList));
          event.preventDefault();
        });
      });
      bindDelete(playerValues);
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindDelete(arr) { // Event handler for the delete button.
  var button;
  arr.results.forEach( function(e) {
    button = document.getElementById("del" + e.player_id);
    button.addEventListener('click', function(event) {
      var reqList = new XMLHttpRequest();
      var packageList = {'Delete Item': e.player_id};
      reqList.open('POST', '/players', true);
      reqList.setRequestHeader('Content-Type', 'application/json');
      reqList.addEventListener('load', function() {
        if (reqList.status >= 200 && reqList.status < 400) {
          window.location.href = '/players';
        } else {
          console.log("Error in network request: " + reqList.statusText);
        }
      });
      reqList.send(JSON.stringify(packageList));
      event.preventDefault();
    });
  });
}

function bindPlayerGamesLists() { // Event handler for each player's game list.
  var req = new XMLHttpRequest();
  var package = {'GetPlayersSpecific': 1};
  req.open('POST', '/players', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var playerValues = JSON.parse(req.responseText);
      var button;
      playerValues.results.forEach( function(e) {
        button = document.getElementById("list" + e.player_id);
        button.addEventListener('click', function(event) {
          var reqList = new XMLHttpRequest();
          var packageList = {'Player Id': e.player_id};
          reqList.open('POST', '/player-game', true);
          reqList.setRequestHeader('Content-Type', 'application/json');
          reqList.addEventListener('load', function() {
            if (reqList.status >= 200 && reqList.status < 400) {
              window.location.href = '/player-game';
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
  req.send(JSON.stringify(package));
}