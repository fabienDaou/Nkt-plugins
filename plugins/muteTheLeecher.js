$.plugin({
    
    name: 'muteTheLeecher',
    onNewUser: function(nick) {
        if (nick != $.chat.myNick() && nick.indexOf('leech_') === 0 ) {
            if (!$.chat.isMuted(nick)) $.chat.mute(nick);
        }
    },
    init: function() {
        if (!$.chat.isMuted(nick)) $.chat.mute(nick);
    }
});
