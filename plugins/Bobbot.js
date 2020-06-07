$.plugin({
    name: "Bobbot",
    onWrite: function (msg, nick) {
        return this.daouspec(msg, true, nick);
    },
    daouspec: function (msg, tags, nick) {
        if (msg.charAt(0) != "/" && (!tags || (tags && nick))) {
            var LoFArray = [
                "Aujourd'hui j'ai juste redÃ©marrÃ© mon ordi parce que je retrouvais plus la souris.",
                "C'est quoi cette histoire de plus 1 djbz?",
                "WTF",
                "OMG",
            ];
            if (msg.indexOf("Bob?") > -1 && msg.indexOf("plugin") === -1)
                setTimeout(function () {
                    $.chat.write(
                        LoFArray[Math.floor(Math.random() * LoFArray.length)],
                        "Bobbot"
                    );
                }, 500);
        }
        return msg;
    },
});
