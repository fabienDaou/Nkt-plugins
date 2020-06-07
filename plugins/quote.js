var quotePlugin = function () {
    var _self = this;
    var user;

    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.pluginApi.loadPlugin('time');
        $.irc.addCmd({
            func: _self.quote,
            description: 'Select the line you want to quote',
            proto: ' /quote'
        }, 'quote');
    };

    _self.stop = function () {
        $.irc.addCmd(null, 'quote');
    };

    _self.onWrite = function (msg, nick) {
        if (msg.split('>').length > 1 && msg.split('>')[1].split(' ').length && msg.split('>')[1].split(' ')[0].split('/').length === 3) return '<i>' + msg + '</i>'
        if (msg.indexOf('/quote') === 0) return ''
        return msg
    };


    _self.quote = function (cmd, params, source) {
        user = source || $.chat.myNick();
        choseQuote();
        return '';

    };

    function choseQuote() {

        setTimeout(function () { $('textarea').val('Select the line you want to quote'); }, 500); $("pre").mouseover(quotemouseover).mouseout(quotemouseout).click(quoteclick);

    }

    function quoteclick(e) {
        //Select the line, retrieve data
        quoteLine(this);
        //Unbind added events to chat
        $("pre").css("background-color", "");
        $("pre").unbind('mouseover', quotemouseover).unbind('mouseout', quotemouseout).unbind('click', quoteclick);
    }

    function quotemouseover(e) {
        $(this).css("background-color", "grey");
    }

    function quotemouseout(e) {
        $(this).css("background-color", "");
    }

    function quoteLine(line) {
        var finalMessage = line.getElementsByTagName("a")[0].title + ' - "' + line.innerText + '"';
        setTimeout(function () { $('textarea').val(''); }, 10);
        $.chat.send(finalMessage.replace(/>/g, ':'));

    }


}

var quotePluginVar = new quotePlugin();

$.plugin({
    name: 'quote',
    init: quotePluginVar.init,
    onWrite: quotePluginVar.onWrite,
    stop: quotePluginVar.stop
});