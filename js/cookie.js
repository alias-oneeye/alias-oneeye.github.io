// QuirksMode.org cookies script, encapsulated in an object.
// http://www.quirksmode.org/js/cookies.html

// Modified 2014-01-15: Do URL decoding on cookie value.

"use strict";

// Don't err out if console is not defined.
var console = console || {
  log: function() {},
  error: function() {}
};

var Cookies = {
  _accepted: false,

  accept: function() { this._accepted = true; },

  create: function(name,value,days) {
    // Don't allow creation of cookies unless the user
    // has accepted the cookie policy.
    if (!this._accepted) {
      return;
    }
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  },

  read: function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0)
        return decodeURIComponent(c.substring(nameEQ.length,c.length));
    }
    return null;
  },

  erase: function(name) {
    this.create(name,"",-1);
  }
}

function findElement(id) {
  var element = document.getElementById(id);
  if (!element) {
    console.error("Can't find element: " + id);
    throw new Exception();
  }
  return element;
}

document.addEventListener('DOMContentLoaded', function(event) {
  try {
    var cookieHeader = findElement('cookie-header');
    var cookieAccept = findElement('cookie-accept');
    var cookie = Cookies.read('cookie-accept');
    if (cookie) {
      console.log("Previous accept cookie found.");
      cookieHeader.className = 'hidden';
      Cookies.accept();
    } else {
      console.log("Previous accept cookie not found.");
      cookieAccept.addEventListener("click", function() {
        Cookies.accept();
        Cookies.create('cookie-accept', 'true');
        cookieHeader.className = 'hidden';
        console.log("Cookies accepted.");
      });
    }
  } catch (e) {
    console.log('Abnormal exit.');
  }
});

