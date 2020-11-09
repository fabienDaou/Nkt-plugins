var pollPlugin = function () {
    
    var _self = this ;
    var proto = '/poll start [question,réponse1,réponse2,...] ou [pollID] | scores | stop | list | reset | rm ';
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.poll, 
            description:'Plugin de sondage',
            proto: proto
        }, 'poll');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'poll');
    };
    
    /**
     * Action of command /poll
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)

     */
    _self.poll = function (cmd, params, source) {
		if( !source ) { try{

            var words = params.split(' ');
            if (words[0] === 'start') {
                let pollID;
                if (isNaN(words[1])) {
                  let pollStr = params.split('start');
                  pollStr.shift();
                  pollStr = pollStr.join('');
                  console.log(pollStr);
                  const pollArr = pollStr.split(',');
                  pollID = Math.ceil(Math.random()*1000);
                  let poll = JSON.parse(localStorage.getItem('poll') || '{}');
                  poll[pollID] = { pollArr, pollScores : [], pollAlreadyVoted : [] }; 
                  localStorage.setItem('poll', JSON.stringify(poll));
                } else {
                  const storedPoll = JSON.parse(localStorage.getItem('poll'));
                  if (!storedPoll[words[1]]) {
                    $.chat.write('poll ' + words[1] + ' not found', 'pollbot');
                    return '';
                  }
                }
                localStorage.setItem('pollActive', (pollID || words[1]).toString());
                $.chat.write('poll ' + (pollID || words[1]) + ' active', 'pollbot');
            } else if (words[0] === 'stop') {
                localStorage.setItem('pollActive', '');
                $.chat.write('poll inactive', 'pollbot');
            } else if (words[0] === 'scores') {
                const pollID = localStorage.getItem('pollActive');
                if (!pollID) {
                  $.chat.write('no active poll', 'pollbot');
                  return '';
                }
                const pollObj = JSON.parse(localStorage.getItem('poll'));
                const poll = pollObj[pollID];
                let ret = '[POLL] ' + poll.pollArr.shift();
                const max = Math.max(...poll.pollScores);
                for (let i = 0; i < poll.pollArr.length; i++) {
                  ret += ("\n" +
                    (i + 1).toString() + ') ' + poll.pollArr[i]
                    + ' - ' + (poll.pollScores[i] || 0) + ' votes ' + (poll.pollScores[i] == max ? '(first)' : '')
                  );
                }
                $.chat.send(ret);
            } else if (words[0] === 'list') {
                $.chat.write(JSON.stringify(JSON.parse(localStorage.getItem('poll')), null, 4), 'pollbot');
            } else if (words[0] === 'reset') {
                const pollID = localStorage.getItem('pollActive');
                if (!pollID) {
                  $.chat.write('no active poll', 'pollbot');
                  return '';
                }
                let pollObj = JSON.parse(localStorage.getItem('poll'));
                pollObj[pollID].pollScores = [];
                pollObj[pollID].pollAlreadyVoted = [];
                localStorage.setItem('poll', JSON.stringify(pollObj));
                $.chat.write('poll ' + pollID + ' reset', 'pollbot');
            }  else if (words[0] === 'rm') {
                const pollID = localStorage.getItem('pollActive');
                if (!pollID) {
                  $.chat.write('no active poll', 'pollbot');
                  return '';
                }
                const pollObj = JSON.parse(localStorage.getItem('poll'));
                delete pollObj[pollID];
                localStorage.setItem('poll', JSON.stringify(pollObj));
                localStorage.removeItem('pollActive');
                $.chat.write('poll ' + pollID + ' removed', 'pollbot');
            } else {
                $.chat.write('Usage is : ' + proto, 'pollbot');
            }

		}catch(e){$.chat.write(e.toString(),'pollbot');return '';}
		}
		return '';
	};

};

var pollPluginVar = new pollPlugin();

$.plugin({
    name: 'poll',
    init: pollPluginVar.init,
	onWrite: function(msg, nick){
		if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
			return '';
        }
        if (msg.charAt(0) === '/') return msg;
        const pollActive = localStorage.getItem('pollActive');
        if (!pollActive) return msg;
        try {
            const poll = JSON.parse(localStorage.getItem('poll'));
            const currPoll = poll[pollActive];
            var msgtest = msg.slice();
            if (msgtest.charAt(0) === '<') msgtest = msg.split('>')[1].split('<')[0]; // *puke*
            const ix = msgtest.toLowerCase().replace(/ /g,'');
            if (isNaN(ix) || !ix) return msg;
            if (currPoll.pollAlreadyVoted.indexOf(nick) > -1) return msg;
            poll[pollActive].pollScores[ix-1] = poll[pollActive].pollScores[ix-1] ? poll[pollActive].pollScores[ix-1] + 1 : 1;
            poll[pollActive].pollAlreadyVoted.push(nick);
            localStorage.setItem('poll', JSON.stringify(poll));
        } catch (e) {}
		return msg;
	},
    stop: pollPluginVar.stop
});
