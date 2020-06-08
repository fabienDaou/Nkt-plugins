$.plugin({
    name: "Jahan",
    onWrite: function (msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    TalkBot: function (msg, tags, nick) {
        var JahanArray = [
            "This seems to be broken.",
            "Quoi de neuf Traque-Source ?",
            "Un problème, Traque-Source ?",
            "Je vous écoute, Traque-Source.",
            "Cet endroit est très mystérieux, bs bs bs ...",
        ];
        if (
            msg.charAt(0) != "/" &&
            msg.indexOf("plugin") === -1 &&
            (!tags || (tags && nick))
        ) {
            if (msg.indexOf("Jahan") > -1 || msg.indexOf("Jehan") > -1)
                setTimeout(function () {
                    $.chat.write(
                        JahanArray[
                            Math.floor(Math.random() * JahanArray.length)
                        ],
                        "Jahan"
                    );
                }, 500);
            if (msg.indexOf("cinq") > -1)
                setTimeout(function () {
                    $.chat.write(
                        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH",
                        "LaMeufQuiFait"
                    );
                }, 500);
        }
        return msg;
    },
});
