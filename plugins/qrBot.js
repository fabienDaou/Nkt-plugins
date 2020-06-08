$.plugin({
	name: 'qrBot',
  onWrite: function(msg, nick) {
      return this.qrBot(msg, true, nick);
  },
  qrBot: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
      var QrArray = ["un jour ce sera fix promis"];
      if(msg.indexOf("qrBot") > -1 && nick == $.chat.myNick()) {
        var rnd = Math.floor(Math.random()*QrArray.length);
        $.chat.send('°Qrquote '+rnd.toString());
      } else if(msg.indexOf('°Qrquote') > -1) {
        var index = parseInt(msg.split('°Qrquote ')[1]);
		    setTimeout(function(){
				  $.chat.write( QrArray[index], 'qrBot');
        }, 500); return '';
      }
    }
    return msg;
  }
});