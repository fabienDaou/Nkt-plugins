$.plugin({
  name: 'glitch',
  init: function() {
    $.pluginApi.loadPlugin('time');
    $.fn.shuffleLetters = function(prop) {
      // Handling default arguments
      var options = $.extend({
        // Default arguments
        "step"  : 4,    // How many times should the letters be changed
        "fps"   : 200,   // Frames Per Second
        "text"  : ""    // Use this text instead of the contents
      }, prop)
      return this.each(function() {
        // The main plugin code goes here
        var el = $(this);
        var str = "";
        if (options.text) {
          str = options.text.split('');
        } else {
          str = el.text().split('');
        }
        // The types array holds the type for each character;
        // Letters holds the positions of non-space characters;
        var types = [];
        var letters = [];
        // Looping through all the chars of the string
        for (var i=0; i < str.length; i++) {
          var ch = str[i];
          if (ch === " ") {
            types[i] = "space";
            continue;
          } else if (/[a-z]/.test(ch)) {
            types[i] = "lowerLetter";
          } else if (/[A-Z]/.test(ch)) {
            types[i] = "upperLetter";
          } else {
            types[i] = "symbol";
          }
          letters.push(i);
        }
        el.html("");            
        // Self executing named function expression:
        (function shuffle(start) {
          // This code is run options.fps times per second
          // and updates the contents of the page element
          var i;
          var len = letters.length;
          var strCopy = str.slice(0); // Fresh copy of the string
          if (start > len) {
            return;
          }
          // All the work gets done here
          for (i = 0; i < len; i++) {
            // The start argument and options.step limit
            // the characters we will be working on at once
            //if (i < start + options.step) {
              // Generate a random character at this position
              strCopy[letters[i]] = randomChar(types[letters[i]]);
            //}
            //else {
              //strCopy[letters[i]] = "";
            //}
          }
          el.text(strCopy.join(""));
          if (start === 0) el.text(str.join(""));
          else setTimeout(function() {
            shuffle(start + 1);
          }, 1000 / options.fps);
        })(-options.step);
      });
    };
    // A helper function
    function randomChar(type) {
      // Generate and return a random character
      var pool = "";
      if (type === "lowerLetter") {
        pool = "abcdefghijklmnopqrstuvwxyz0123456789";
      }
      else if (type === "upperLetter") {
        pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      }
      else if (type === "symbol") {
        pool = ",.?/\\(^)![]{}*&^%$#'\"";
      }
      var arr = pool.split('');
      return arr[Math.floor(Math.random()*arr.length)];
    }
  },
  onWrite: function(msg, nick) {
    return this.glitch(msg, true, nick);
  },
  glitch: function(msg, tags, nick) {
    if (msg.charAt(0) !== '/' && (!tags || (tags && nick))) {
      setTimeout(function() {
        var $el = $('#chat a:first()');
        if ($el.html().indexOf('nsafe') > -1) {
          return;
        }
        $('#chat a:first()').shuffleLetters({text: $el.text()});
      }, 50);
    }
    return msg;
  }
});