/*************************************************************
** File Name: mapList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/maps'
**   webpage.  
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindSelectBy();
  bindSelectValueBy();
  bindSortBy();
  bindAdd();
  bindUpdateDelete();
  warningTimer();
});

function bindSelectBy() { // Set selection pulldown values.
  var select = document.getElementById('map-select-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSel': 1};
  reqSess.open('POST', '/maps', true);
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
    req.open('POST', '/maps', true);
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
  var select = document.getElementById('map-select-value-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSelVal': 1};
  reqSess.open('POST', '/maps', true);
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
    req.open('POST', '/maps', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        window.location.href = '/maps';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
} 

function bindSortBy() { // Set sort value pulldown values.
  var select = document.getElementById('map-sort-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSort': 1};
  reqSess.open('POST', '/maps', true);
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
    req.open('POST', '/maps', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        window.location.href = '/maps';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
}

function selectValueMod(val) { // Assists bindSelectBy() in populating values.
  var select = document.getElementById('map-select-value-by');
  var children = select.childNodes;
  var loopNum = children.length;
  for (var i = 1; i <= loopNum - 1; i++) {
    select.removeChild((select.firstChild).nextSibling);
  }
  if (val == 'Map Name') {
    var option = document.createElement('option');
    option.textContent = 'All';
    option.value = '1';
    select.appendChild(option);
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
  } else if (val == 'Map Type') {
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
  } else if (val == 'None') {
    clearSelVal(0);
  }
}

function updSelVal() { // Update selection value.
  var select = document.getElementById('map-select-value-by');
  var req = new XMLHttpRequest();
  var package = {'GetCurrSelVal': 1};
  req.open('POST', '/maps', true);
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
  var select = document.getElementById('map-select-value-by');
  var req = new XMLHttpRequest();
  if (val == 'Map Name') {
    var package = {'ValUpdate': 1, 'SelectVal': '1'};
  } else if (val == 'Map Type') {
    var package = {'ValUpdate': 1, 'SelectVal': 'All'};
  } else {
    var package = {'ValUpdate': 1, 'SelectVal': '1'};
  } 
  req.open('POST', '/maps', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      if (val != 0) {
        window.location.href = '/maps';    
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
    window.location.href = '/map-add';
    event.preventDefault();
  });
}

function bindUpdateDelete() { // Sets event handler for update, calls bindDelete().
  var req = new XMLHttpRequest();
  var package = {'GetMapsSpecific': 1};
  req.open('POST', '/maps', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var mapValues = JSON.parse(req.responseText);
      var button;
      mapValues.results.forEach( function(e) {
        button = document.getElementById("upd" + e.map_id);
        button.addEventListener('click', function(event) {
          var reqList = new XMLHttpRequest();
          var packageList = {'Map Id': e.map_id};
          reqList.open('POST', '/map-update', true);
          reqList.setRequestHeader('Content-Type', 'application/json');
          reqList.addEventListener('load', function() {
            if (reqList.status >= 200 && reqList.status < 400) {
              window.location.href = '/map-update';
            } else {
              console.log("Error in network request: " + reqList.statusText);
            }
          });
          reqList.send(JSON.stringify(packageList));
          event.preventDefault();
        });
      });
      bindDelete(mapValues);
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

function bindDelete(arr) { // Event handler for the delete button.
  var button;
  arr.results.forEach( function(e) {
    button = document.getElementById("del" + e.map_id);
    button.addEventListener('click', function(event) {
      var reqList = new XMLHttpRequest();
      var packageList = {'Delete Item': e.map_id};
      reqList.open('POST', '/maps', true);
      reqList.setRequestHeader('Content-Type', 'application/json');
      reqList.addEventListener('load', function() {
        if (reqList.status >= 200 && reqList.status < 400) {
          window.location.href = '/maps';
        } else {
          console.log("Error in network request: " + reqList.statusText);
        }
      });
      reqList.send(JSON.stringify(packageList));
      event.preventDefault();
    });
  });
}

function warningTimer() { // Warning only remains for specified time.
  setTimeout( function() {
    var header = document.getElementById("warning");
    if (header) {
       var parent = header.parentNode;
       parent.removeChild(header);
    }
  }, 4500);
}