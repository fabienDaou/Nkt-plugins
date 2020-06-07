$.plugin({
	name: 'DeniseBot',
  onWrite: function(msg, nick) {
      return this.DeniseBot(msg, true, nick);
  },
  DeniseBot: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
      if(msg.indexOf("boobs") > -1 || msg.indexOf("nichons") > -1 || msg.indexOf("seins") > -1 || msg.indexOf("meules")> -1|| msg.indexOf("nichons")> -1)
		    setTimeout(function(){
			    $.chat.write('Hey Guys!', 'DeniseMilani');
		    }, 500);
    }
    return msg;
  }
});