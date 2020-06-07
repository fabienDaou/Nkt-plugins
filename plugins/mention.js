$.plugin({
            
    name: 'mention',
    
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    
    
    replaceAll: function(msg, tags, nick) {
    
        if (msg.charAt(0) != '/' && (!tags || (tags && nick))) {
            if(msg.indexOf("@"+$.chat.myNick()) > -1)
		msg = '<span style="color:#BB0000">'+msg+'</span>';
        }
        
        return msg;
    }
    
    
    
});