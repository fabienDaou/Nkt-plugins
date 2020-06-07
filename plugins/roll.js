var rollPlugin = function () {
    
    var _self = this ;
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.roll, 
            description:'rolls a dice', 
            proto:'/roll [attribute] [XdY+Z]'
        }, 'roll');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'roll');
    };
    
    /**
     * Action of command /roll
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)

     */
    _self.roll = function (cmd, params, source) {
		if( !source ) { try{
			var words = params.split(' ');
			var evaluate = false;
			for(var i in words) if(words[i].charAt(0) >= 1) evaluate = words[i];
			var result = 0, diceSize = 20;
			if(evaluate){
				var diceNb = evaluate.split('d')[0] || 1;
				diceSize = evaluate.split('d')[1].split('+')[0].split('-')[0] || 20;
				var diceBonus = evaluate.split('+')[1] || 0;
				var diceMalus = evaluate.split('-')[1] || 0;
				for(var i = 0;i < diceNb;i++) result += Math.ceil((Math.random() * parseInt(diceSize)));
				result += parseInt(diceBonus)-parseInt(diceMalus);
			}else result = Math.ceil((Math.random() * 20));
			$.chat.send('/me is rolling a'+(params?' '+params:'')+' check...');
			if(result == 1) $.chat.send('/me scored a '+result+', EPIC FAIL !');
			else if(result == diceSize) $.chat.send('/me scored a '+result+', EPIC WIN !');
			else $.chat.send('/me scored a '+result+' !');
		}catch(e){return '';}
		}
		return '';
	};

};

var rollPluginVar = new rollPlugin();
    
$.plugin({
    name: 'roll',
    init: rollPluginVar.init,
	onWrite: function(msg, nick){
		if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
			msg = '';
        }
		return msg;
	},
    stop: rollPluginVar.stop
});