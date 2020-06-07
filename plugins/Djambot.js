$.plugin({
	name: 'Djambot',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    init: function() {

    },
    
    
    TalkBot: function(msg, tags, nick) {
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {		    
            if(msg.indexOf("enorme") > -1 || msg.indexOf("large") > -1)
				setTimeout(function(){
					$.chat.write('CMB !', 'Djambot');                   
				}, 500);
            if(msg.indexOf("easy") > -1 || msg.indexOf("facile") > -1)
                setTimeout(function(){
                    $.chat.write('CTM !', 'Djambot');                 
                }, 500);
            if(msg.indexOf("glisse") > -1 || msg.indexOf("fait mal") > -1)
                setTimeout(function(){
                    $.chat.write('CMBDTC !', 'Djambot');                    
                }, 500);   
            if(msg.indexOf("petit") > -1)
                setTimeout(function(){                
                    $.chat.write('CTB !', 'Djambot');                    
                }, 500);        
        }
        
        return msg;
    }
});