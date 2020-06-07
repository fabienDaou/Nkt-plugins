var pwgenPlugin = function () {
    
    var _self = this ;
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.pwgen, 
            description:'generates a random password', 
            proto:'/pwgen [length]'
        }, 'pwgen');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'pwgen');
    };
    
    /**
     * Action of command /pwgen
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)

     */
    _self.pwgen = function (cmd, params, source) {
		if( !source ) { try{
			var words = params.split(' ');
			var evaluate = false;
			for(var i in words) if(words[i].charAt(0) >= 1) evaluate = words[i];
			var result = 0;
			if(evaluate){
				result = btoa(String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(parseInt(evaluate)))));
			}else result = btoa(String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(20))));
			$.chat.write(result, 'pwgen');
		}catch(e){return '';}
		}
		return '';
	};

};

var pwgenPluginVar = new pwgenPlugin();
    
$.plugin({
    name: 'pwgen',
    init: pwgenPluginVar.init,
	onWrite: function(msg, nick){
		if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
			msg = '';
        }
		return msg;
	},
    stop: pwgenPluginVar.stop
});