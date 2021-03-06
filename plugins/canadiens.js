$.plugin({
    name: "canadiens",
    onSend: function (msg) {
        return this.replaceAll(msg, false);
    },
    onWrite: function (msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    replaceAll: function (msg, tags, nick) {
        if (
            msg.charAt(0) != "/" &&
            (!tags || (tags && nick)) &&
            nick != $.chat.myNick()
        ) {
            msg = msg.replace(/chinoi/g, "canadien");
            msg = msg.replace(/génial/g, "génital");
            if (nick == "Djambi") {
                msg = msg.replace(/linux/gi, "windows");
            }
        }
        return msg;
    },
});
