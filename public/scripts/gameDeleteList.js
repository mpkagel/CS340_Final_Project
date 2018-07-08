/*************************************************************
** File Name: gameDeleteList.js
** Author: Mathew Kagel
** E-mail: kagelm@oregonstate.edu
** Course: CS340-400
** Description: This is the javascript file for the '/game-delete'
**   webpage. 
*************************************************************/
document.addEventListener('DOMContentLoaded', function() {
  bindDelete();
});

function bindDelete() { // Event handler for the delete button.
  var select = document.getElementById('delButton');
  select.addEventListener('click', function() {
    var req = new XMLHttpRequest();
    var package = {'Delete Item': 1};
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
  });
} 
