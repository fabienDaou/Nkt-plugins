$.plugin({
	name: 'zafBot',
  onWrite: function(msg, nick) {
      return this.zafBot(msg, true, nick);
  },
  zafBot: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
      var ZafArray = ["Je suis un lézard", "t'es mauvais", "je m'ennuie", "c'est nul", "je bouffe pas les dynos moi", "le nasus m'a buvette"];
      if(msg.indexOf("zaf") > -1 && nick == $.chat.myNick() && Math.random() > 0.65) {
        var rnd = Math.floor(Math.random()*ZafArray.length);
        $.chat.send('°Zafquote '+rnd.toString());
      } else if(msg.indexOf('°Zafquote') > -1) {
        var index = parseInt(msg.split('°Zafquote ')[1]);
		    setTimeout(function(){
				  $.chat.write( ZafArray[index], 'zaf');
        }, 500);
        return '';
      }
    }
    return msg;
  }
});
