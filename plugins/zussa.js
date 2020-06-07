$.plugin({
	name: 'zussa',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
		
        if (msg.charAt(0) != '/'  && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
            if(msg.indexOf("labo") != -1 )
				setTimeout(function(){
					$.chat.write('On parle de moi?', 'LoicZussa');                    
                    
				}, 500);            
        }
        
        return msg;
    }
});