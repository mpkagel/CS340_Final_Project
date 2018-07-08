/*************************************************************
** File Name: unitList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/units'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindSelectBy();
  bindSelectValueBy();
  bindSortBy();
});

function bindSelectBy() { // Set selection pulldown values.
  var select = document.getElementById('unit-select-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSel': 1};
  reqSess.open('POST', '/units', true);
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
    req.open('POST', '/units', true);
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
  var select = document.getElementById('unit-select-value-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSelVal': 1};
  reqSess.open('POST', '/units', true);
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
    req.open('POST', '/units', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        window.location.href = '/units';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
} 

function bindSortBy() { // Set sort value pulldown values.
  var select = document.getElementById('unit-sort-by');
  var reqSess = new XMLHttpRequest();
  var packageSess = {'GetCurrSort': 1};
  reqSess.open('POST', '/units', true);
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
    req.open('POST', '/units', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        window.location.href = '/units';
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });
    req.send(JSON.stringify(package));
    event.preventDefault();
  });
}

function selectValueMod(val) { // Assists bindSelectBy() in populating values.
  var select = document.getElementById('unit-select-value-by');
  var children = select.childNodes;
  var loopNum = children.length;
  for (var i = 1; i <= loopNum - 1; i++) {
    select.removeChild((select.firstChild).nextSibling);
  }
  if (val == 'Race') {
    var option1 = document.createElement('option');
    option1.textContent = 'All';
    option1.value = 'All';
    var option2 = document.createElement('option');
    option2.textContent = 'Protoss';
    option2.value = 'Protoss';
    var option3 = document.createElement('option');
    option3.textContent = 'Terran';
    option3.value = 'Terran';
    var option4 = document.createElement('option');
    option4.textContent = 'Zerg';
    option4.value = 'Zerg';
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    updSelVal();
  } else if (val == 'None') {
    clearSelVal(0);
  }
}

function updSelVal() { // Update selection value.
  var select = document.getElementById('unit-select-value-by');
  var req = new XMLHttpRequest();
  var package = {'GetCurrSelVal': 1};
  req.open('POST', '/units', true);
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
  var select = document.getElementById('unit-select-value-by');
  var req = new XMLHttpRequest();
  if (val == 'Race') {
    var package = {'ValUpdate': 1, 'SelectVal': 'All'};
  } else {
    var package = {'ValUpdate': 1, 'SelectVal': '1'};
  } 
  req.open('POST', '/units', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      if (val != 0) {
        window.location.href = '/units';    
      }
    } else {
      console.log("Error in network request: " + req.statusText);
    }
  });
  req.send(JSON.stringify(package));
}

