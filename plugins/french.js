$.plugin({
    // VERSION 0.0.2
    name: 'french',
    
    onWrite: function(msg, nick) {
        return this.french(msg, true, nick);
    },
    
    
    french: function(msg, tags, nick) {        
        var nickBegin =  ['Courgette', 'Banane', 'Tomate', 'Laitue', 'Salade', 'Endive', 'Fraise', 'Sauce', 'Soupe', 'Fourchette', 'Cuiller', 'Poire', 'Cotelette', 'Saucisse', "Gousse d'ail"]; 
        var nickEnd =  ['Furtive', 'Nerveuse', 'Bavaroise', 'Placide', 'Cynique', 'Proverbiale', 'Moelleuse', 'Festive', 'Infernale', 'Trepidante', 'Hardie', 'Supreme', 'Subtile', 'Opiniatre']; 
       
        
        
        var begin  = nickBegin[Math.floor(Math.random() * nickBegin.length)];
        var end = nickEnd[Math.floor(Math.random() * nickEnd.length)];
            
       
        
        if (msg.charAt(0) != '/' && (!tags || (tags && nick))) {
            if(msg.indexOf("french") > -1 && msg.indexOf('plugin') === -1)
                setTimeout(function(){
                    $.chat.write("Tu seras " + begin + end + " !", 'BotAstucieux');
                }, 500);
        }
        
        return msg;
    }
});