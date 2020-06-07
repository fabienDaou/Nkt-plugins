var userprefs = function () {
    
    var _self = this ;
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.userprefs, 
            description:'Save current settings or Restore previously saved settings. "Settings" are user favorite settings such as nick and loaded/unloaded plugins', 
            proto:'/userprefs (save|restore)'
        }, 'userprefs');
    } ;
    
    _self.stop = function() {
        $.irc.addCmd(null, 'userprefs');
    }
    
    /**
     * Action of command /userprefs
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)
     * @return string Message to send to the others
     */
    _self.userprefs = function (cmd, params, source) {
        
            
		var arg = (params.indexOf(' ') >= 0 ) ? 
			params.substring(0, params.indexOf(' ')) : 
			params
		;
		
		var arg, msg ;
		var ls = window.localStorage;
		var settings = JSON.parse(ls.getItem('settings'));
		
		if (params.indexOf(' ') >= 0 ) {
			arg = params.substring(0, params.indexOf(' '));
			msg = params.substring(params.indexOf(' ')+1);
		} else {
			arg = params;
			msg = '';
		}
		if (arg == 'save'){
			var plugins = [];
			var list = $.pluginApi.pluginList();
			ls.setItem('settings',JSON.stringify({nick: $.chat.myNick(), loaded: list.loaded, unloaded: list.unloaded}));
			$.chat.write('Settings saved.','');
		}
		if (arg == 'restore'){
			for(var i in settings.loaded)
				$.chat.send('/plugin load '+settings.loaded[i], $.chat.myNick())
				//$.pluginApi.loadPlugin(settings.loaded[i]);
			for(var i in settings.unloaded)
				$.chat.send('/plugin unload '+settings.unloaded[i], $.chat.myNick())
				//$.pluginApi.unloadPlugin(settings.unloaded[i]);
			if(settings.nick && settings.nick != $.chat.myNick())
				//$.chat.send('/nick '+settings.nick, $.chat.myNick())
			$.chat.write('Settings restored.','');
		}
		return '';
    };

};

var userprefsVar = new userprefs();
    
$.plugin({
    name: 'userprefs',
    init: userprefsVar.init,
    stop: userprefsVar.stop
});