$.plugin({
            
    name: 'time',
    
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    
    
    replaceAll: function(msg, tags, nick) {
    
        if (msg.charAt(0) != '/' && (!tags || (tags && nick)) && msg){
            var d = new Date();
			msg = '<a title="'+d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'">'+msg+'</a>';
        }
        
        return msg;
    }
    
    
    
});