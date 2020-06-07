$.plugin({
    name: 'dis',
    onSend: function(msg){
        return this.replaceAll(msg, false);
    },
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    replaceAll: function(msg, tags, nick) {
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick)) && nick != $.chat.myNick() && msg.indexOf('disclaimer') == -1) {msg=$(msg).text();
            if(msg.indexOf('di')>-1 && msg.split('di')[1].split(' ')[0].length > 3) setTimeout(function(){$.chat.write(msg.split('di')[1].split(' ')[0],'dis');}, 500);
            if(msg.indexOf('dy')>-1 && msg.split('dy')[1].split(' ')[0].length > 3) setTimeout(function(){$.chat.write(msg.split('dy')[1].split(' ')[0],'dis');}, 500);
            if(msg.indexOf('d\'i')>-1 && msg.split('d\'i')[1].split(' ')[0].length > 3) setTimeout(function(){$.chat.write(msg.split('d\'i')[1].split(' ')[0],'dis');}, 500);
            if(msg.indexOf('d\'y ')>-1 && msg.split('d\'y ')[1].split(' ')[0].length > 3) setTimeout(function(){$.chat.write(msg.split('d\'y ')[1].split(' ')[0],'dis');}, 500);
        }//TEST
        return msg;
    }
});