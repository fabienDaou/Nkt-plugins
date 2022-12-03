$.plugin({
    
    name: 'muteTheLeecher',
    onNewUser: function(nick) {
        if (nick != $.chat.myNick() ) {
            if (nick && nick.indexOf('leech_') === 0 && !$.chat.isMuted(nick)) setTimeout(function(){$.chat.mute(nick)}, 10);
        }
    },
    init: function() {
        for (let nick of $.chat.nicks()) {
            if (nick && nick.indexOf('leech_') === 0 && !$.chat.isMuted(nick)) setTimeout(function(){$.chat.mute(nick)}, 10);
        }
    }
});
