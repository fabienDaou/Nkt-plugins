$.plugin({
	name: 'neyBot',
  onWrite: function(msg, nick) {
      return this.neyBot(msg, true, nick);
  },
  neyBot: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
      var neyArray = ["Je suis complexe.", "C'est l'ordre naturel.", "J'ai jamais dit ça"];
      var keys = ['jesuiscomplexe'];
      var quotes = ['<img src=https://i.imgur.com/Zdvf3wE.jpg />'];
      var test = -1;
      for(i in keys){test = msg.indexOf(keys[i]); if(test != -1) break;}
      if(test != -1)
        setTimeout(function(){
          $.chat.write(quotes[i], 'ney');
        }, 500);
      if(msg.indexOf("ney") > -1 && nick == $.chat.myNick() && Math.random() > 0.65) {
        var rnd = Math.floor(Math.random()*neyArray.length);
        $.chat.send('°Neyquote '+rnd.toString());
      } else if(msg.indexOf('°Neyquote') > -1) {
        var index = parseInt(msg.split('°Neyquote ')[1]);
		    setTimeout(function(){
				  $.chat.write( neyArray[index], 'ney');
        }, 500);
        return '';
      }
    }
    return msg;
  }
});