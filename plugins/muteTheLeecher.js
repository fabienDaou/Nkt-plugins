$.plugin({
    
    name: 'muteTheLeecher',
    onNewUser: function(nick) {
        if (nick != $.chat.myNick() ) {
            if (nick && nick.indexOf('leech_') === 0 && !$.chat.isMuted(nick)) $.chat.mute(nick);
        }
    },
    init: function() {
        for (let nick of $.chat.nicks()) {
            if (nick.indexOf('leech_') === 0 && !$.chat.isMuted(nick)) $.chat.mute(nick);
        }
    }
});
