$.plugin({
	name: 'GW',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
		
        if (msg.charAt(0) != '/'  && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
            if(msg.indexOf("et") == 0 )
				setTimeout(function(){
					$.chat.write('Et Général Wukong!', 'Daoulas');                    
                    
				}, 500);            
        }
        
        return msg;
    }
});