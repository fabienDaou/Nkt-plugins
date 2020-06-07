$.plugin({
    name: 'download',
    onSend: function(msg){
        return this.replaceAll(msg, false);
    },
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    replaceAll: function(msg, tags, nick) {
        if (msg.charAt(0) != '/' && (!tags || (tags && nick)) && nick != $.chat.myNick()) {
            var tmp='<a download="ok.txt" href="data:;,je suis un fichier">DOWNLOAD</a>';
        }
        return msg;
    }
});