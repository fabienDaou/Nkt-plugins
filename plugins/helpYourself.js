$.plugin({
    name: "helpYourself",
    onWrite: function (msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    TalkBot: function (msg, tags, nick) {
        if (msg.charAt(0) != "/" && (!tags || (tags && nick))) {
            if (
                msg.indexOf("elp yourself") > -1 &&
                msg.indexOf("plugin") === -1
            )
                setTimeout(function () {
                    $.chat.write("Yes, help me!", "Youssef");
                }, 500);
        }
        return msg;
    },
});
