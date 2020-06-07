$.plugin({
    name: "barBot",
    onWrite: function (msg, nick) {
        return this.barBot(msg, true, nick);
    },
    barBot: function (msg, tags, nick) {
        if (
            msg.charAt(0) != "/" &&
            msg.indexOf("plugin") === -1 &&
            (!tags || (tags && nick))
        ) {
            var barBot = [
                "Black dog (viande+drink, chatelet - 5h fri-sat - 2h)",
                "Harry's New York Bar (vieux, cher, bloody mary, opera - 2h)",
                "Biere & Malt, et Hoppy Corner (craft beer, petits, grands boulevards - minuit (BM) - 2h (HC))",
                "Lulu White (absinthe, cosy, pigalle - 2h)",
                "Vintimille (the very best, pigalle - 2h)",
                "Reset (video games retro,fight,melee, beer, chatelet - 2h - minuit sat)",
                "Rosa bonheur Ã  l'ouest (guinguette chill, asnieres - 23h45)",
                "Cafe le Buci (late late night, cher - pont neuf RG - 5h30+)",
                "The Mazet (late late night, toilettes typiques, attention au white russian- pont neuf RG - 5h j/v/s)",
                "Le Mayflower (a tester, pantheon - 1h50)",
                "The Bombardier (nice pub, lots of beers, pantheon - 2h)",
                "Jefrey's (bar Ã  cocktails, sucrÃ© salÃ©, cuir comfortable, chatelet-sentier - 2h)",
                "Frog Hop house (craft beers, quartier calme, place vendome - 1h)",
                "Les Caves AlliÃ©es (Nerds, jeux, Gwen, many bottles, 6eme arrond. - 2h)",
            ];
            if (msg.indexOf("bar?") > -1 && nick == $.chat.myNick()) {
                var rnd = Math.floor(Math.random() * barBot.length);
                $.chat.send("Â°barBot " + rnd.toString());
            } else if (msg.indexOf("Â°barBot") > -1) {
                var index = parseInt(msg.split("Â°barBot ")[1]);
                setTimeout(function () {
                    $.chat.write(barBot[index], "bar");
                }, 500);
                return "";
            }
        }
        return msg;
    },
});
