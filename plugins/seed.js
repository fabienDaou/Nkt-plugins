$.plugin({
    name: 'seed',
    init: function () {
        var loadAndLog = function (pluginName) {
            //console.log(pluginName + " is loading...");
            try{$.pluginApi.loadPlugin(pluginName);}catch(e){}
        };
        //$.pluginApi.unloadPlugin('TalkBot');
        loadAndLog('time');
        loadAndLog('EyePopping');
        loadAndLog('IRCcmd');
        loadAndLog('removeBeta');
        loadAndLog('EventHorizon');
        loadAndLog('NewMsgTitle');

        var plugins = [
            'summon',
            'userprefs',
            'plus1djbz',
            'KrakoBot',
            'Djambot',
            'daouspec',
            'randomFacts',
            'Jahan',
            'mention',
            'deutsch',
            'KaamelottBot',
            'coolnick',
            'helpYourself',
            'KevinBot',
            'BaitKrako',
            'rulesOfTheInternet',
            'bitschyPlz',
            'canadiens',
            'Bobbot',
            'zussa',
            'cara',
            'abbePierre',
            'roll',
            'benspec',
            'meme',
            'qrBot',
            'DeniseBot',
            'gifs',
            'Markov',
            'Anecbot',
            'pwgen',
            'darryckBot',
            'zafBot',
            'todo',
            'quote',
            'selfBot',
            'nktrpg',
            'barBot',
            'neyBot',
            'noF5',
            'blindtest',
            'poll'];
        for(let plugin of plugins) loadAndLog(plugin);
        /*
        var loadPluginsWhenNotLooking = function (plugins) {
            if (plugins.length !== 0) {
                var pluginToLoad = plugins.shift();
                loadAndLog(pluginToLoad);
                setTimeout(() => {
                    if (!looking) {
                        loadPluginsWhenNotLooking(plugins);
                    }
                }, 10);
            }
        };
        var looking;
        $(window).focus(function () {
            looking = true;
        });
        $(window).blur(function () {
            looking = false;
            loadPluginsWhenNotLooking(plugins);
        });*/
    }
});setTimeout(()=>$.pluginApi.loadPlugin('seed'), 1);
