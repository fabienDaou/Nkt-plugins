$.plugin({
            
    name: 'bitschyPlz',
    
    onSend: function(msg){
        return this.replaceAll(msg, false);
    },
    
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    
    
    replaceAll: function(msg, tags, nick) {
    
        if (msg.charAt(0) != '/'  && msg.indexOf('plugin') === -1 && (!tags || (tags && nick)) && nick != $.chat.myNick()) {
            msg = msg.replace( /bitch/g, 'bitschy');
        }
        
        return msg;
    }
});