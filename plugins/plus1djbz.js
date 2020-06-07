$.plugin({
            
    name: 'plus1djbz',
    
    onSend: function(msg){
        return this.replaceAll(msg, false);
    },
    
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    
    
    replaceAll: function(msg, tags, nick) {
    
        if (msg.charAt(0) != '/' && (!tags || (tags && nick)) && nick != $.chat.myNick()) {
            msg = msg.replace( /\+1/g, '+1 djbz');
			msg = msg.replace( /djbz djbz/g, 'djbz');
        }
        
        return msg;
    }
    
    
    
});