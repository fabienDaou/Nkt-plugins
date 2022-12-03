var serverStatusPlugin = function () {
    
    var _self = this ;
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.battery, 
            description:'get nkt system battery', 
            proto:'/battery'
        }, 'battery');
        $.irc.addCmd({ 
            func: _self.uptime, 
            description:'get nkt system uptime', 
            proto:'/uptime'
        }, 'uptime');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'battery');
        $.irc.addCmd(null, 'uptime');
    };
    
    /**
     * Action of command /battery
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)
     */
    _self.battery = function (cmd, params, source) {
	  	if( !source ) { try{
        fetch('/files/battery').then((r) => r.text()).then((t) => { $.chat.write(t, 'battery'); });
	  	}catch(e){return '';}
		  }
		  return '';
	  };
    
    /**
     * Action of command /uptime
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)
     */
    _self.uptime = function (cmd, params, source) {
	  	if( !source ) { try{
        fetch('/files/uptime').then((r) => r.text()).then((t) => { $.chat.write(t, 'uptime'); });
	  	}catch(e){return '';}
		  }
		  return '';
	  };

};

var serverStatusPluginVar = new serverStatusPlugin();
    
$.plugin({
    name: 'serverStatus',
    init: serverStatusPluginVar.init,
	onWrite: function(msg, nick){
		if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
			msg = '';
        }
		return msg;
	},
    stop: serverStatusPluginVar.stop
});
