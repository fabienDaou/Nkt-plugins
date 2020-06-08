$.plugin({
    // VERSION 0.0.10
    name: 'deutsch',
    
    onWrite: function(msg, nick) {
        return this.deutsch(msg, true, nick);
    },
    
    
    deutsch: function(msg, tags, nick) {        
        var nickBegin =  ['Flummi', 'Geist', 'Hund', 'Bluffs', 'Mädchen', 'Pony', 'Ziege', 'Kohl', 'Geschwindigkeit', 'Ente', 'Witwer', 'Sauerkraut', 'Traum', 'Welt', 'Kartoffel', 'Seelen', 'Stern', 'Blitz', 'Mehlschwitze', 'Schmetterling']; 
        var nickEnd =  ['Besitzer', 'Dieb','Knig', 'Kaiser', 'Mörder', 'Ficker', 'Bändiger', 'Wärmer', 'Futter', 'Weh', 'Katastrophe', 'Panik', 'Salat', 'Meister', 'Fresser', 'Saft', 'Begrenzung', 'Ritter','Angst', 'Lust', 'Regen', 'Gott']; 
       
        
        
        var begin  = nickBegin[Math.floor(Math.random() * nickBegin.length)];
        var end = nickEnd[Math.floor(Math.random() * nickEnd.length)];
            
       
        
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
            if(msg.indexOf("deutsch") > -1)
                setTimeout(function(){
                    $.chat.write("Sie mussen jetzt Sie " + begin + end + " nennen", 'deutsche Nicks');
                }, 500);
        }
        
        return msg;
    }
});