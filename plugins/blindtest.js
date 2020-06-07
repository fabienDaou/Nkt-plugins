var blindtestPlugin = function () {
    
    var _self = this ;
    var proto = '/blindtest new|data|view|scores|reset|stop|banner|send [id]';
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.blindtest, 
            description:'Interface cool et branchée pour examen aveugle<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;new pour en créer un nouveau<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;data pour le peupler<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;view pour consulter le blindtest en cours<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;scores pour envoyer aux joueurs le tableau des scores<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;reset pour remettre les scores à zéro<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;stop pour arrêter la détection des bonnes réponses (réactivé autimatiquement par send)<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;banner pour envoyer la bannière en ascii art (très cool)<br>'
            +'&nbsp;&nbsp;&nbsp;&nbsp;send [id] pour envoyer aux joueurs la musique choisie<br>', 
            proto: proto
        }, 'blindtest');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'blindtest');
    };
    
    /**
     * Action of command /blindtest
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)

     */
    _self.blindtest = function (cmd, params, source) {
		if( !source ) { try{

            var banner = `
                 _       __     __                             __                          
                | |     / /__  / /________  ____ ___  ___     / /_____                     
                | | /| / / _ \\/ / ___/ __ \\/ __ ,__ \\/ _ \\   / __/ __ \\                    
                | |/ |/ /  __/ / /__/ /_/ / / / / / /  __/  / /_/ /_/ /                    
                |__/|__/\\_____/\\___/\\____/_/ /_/ /_/\\___/   \\__/\\____/                     
                    _   ____ ________   ____  __    _____   ______  _______________________
                   / | / / //_/_  __/  / __ )/ /   /  _/ | / / __ \\/_  __/ ____/ ___/_  __/
                  /  |/ / ,\\   / /    / __  / /    / //  |/ / / / / / / / __/  \\__ \\ / /   
                 / /|  / /| | / /    / /_/ / /____/ // /|  / /_/ / / / / /___ ___/ // /    
                /_/ |_/_/ |_|/_/    /_____/_____/___/_/ |_/_____/ /_/ /_____//____//_/     
                                                    
             `;
            var words = params.split(' ');
            if (words[0] === 'new') {
                $.chat.write(banner + `
                  Bienvenue, administrateur. Rendez-vous sur
                  http://ftp.worldoffun9597.free.fr/cinequotes/welcome/
                  pour mettre à disposition vos morceaux. Ensuite,
                  utilisez la commande /blindtest data [ligne]
                `, 'blindbot');
                localStorage.setItem('blindtest_id', Math.random().toString());
            } else if (words[0] === 'data') {
                var ix = 0;
                for (let i = 0; i < params.length; i++) {
                    ix = i;
                    if (params[i] === '_') break;
                }
                let json = JSON.parse(atob(params.substr(ix+1)));
                localStorage.setItem('blindtest_data', JSON.stringify(json));
                $.chat.write(
                    '[ADMIN] Les données suivantes ont été chargées dans le blindtest, '
                    +'utilisez /blindtest view pour les consulter à nouveau : '
                    + JSON.stringify(json, null, 4),
                    'blindbot'
                );
            } else if (words[0] === 'send') {
                var id = parseInt(words[1], 10);
                $.chat.send('[BLINDTEST] '+ id.toString() +' <script>window.open("'
                + JSON.parse(localStorage.getItem('blindtest_data')).items[id].url
                + '","_blank","noreferrer")</script>');
                localStorage.setItem('blindtest_current_item', id.toString());
            } else if (words[0] === 'view') {
                $.chat.write('[ADMIN] Voici les données du blindtest actuel, '
                    + 'utilisez /blindtest send [id] pour envoyer la musique choisie à tout le monde '
                    + JSON.stringify(JSON.parse(localStorage.getItem('blindtest_data')), null, 4),
                'blindbot');
            } else if (words[0] === 'stop') {
                $.chat.write('[ADMIN] Blindtest arrêté.', 'blindbot');
                localStorage.setItem('blindtest_current_item', '');
            } else if (words[0] === 'reset') {
                $.chat.write('[ADMIN] Scores remis à zéro.', 'blindbot');
                localStorage.setItem('blindtest_scores', '{}');
            } else if (words[0] === 'scores') {
                $.chat.send('[BLINDTEST] Scores : '
                + JSON.stringify(JSON.parse(localStorage.getItem('blindtest_scores')).total, null, 4));
            } else if (words[0] === 'banner') {
                $.chat.send(banner);
            } else {
                $.chat.write('Usage is : ' + proto, 'blindbot');
            }

		}catch(e){$.chat.write(e.toString(),'blindbot');return '';}
		}
		return '';
	};

};

var blindtestPluginVar = new blindtestPlugin();

$.plugin({
    name: 'blindtest',
    init: blindtestPluginVar.init,
	onWrite: function(msg, nick){
		if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
			return '';
        }
        if (msg.charAt(0) === '/') return msg;
        var current_item = localStorage.getItem('blindtest_current_item');
        if (!current_item) return msg;
        try {
            var item = JSON.parse(localStorage.getItem('blindtest_data')).items[parseInt(current_item, 10)].hiddenName;
            if ((item.charAt(0) === '1' || item.charAt(0) === '2') && item.charAt(4) === '-') {
                item = item.split('-')[1];
            } else {
                item = item.substr(0, item.length - 4);
            }
            item = item.toLowerCase().replace(/ /g,'');
            var msgtest = msg.slice();
            if (msgtest.charAt(0) === '<') msgtest = msg.split('>')[1].split('<')[0]; // *puke* 
            if (msgtest.indexOf('(private) ') === 0) msgtest = msgtest.substr(10); // *vomit*
            if (msgtest.toLowerCase().replace(/ /g,'') === item) {
                var scores = JSON.parse(localStorage.getItem('blindtest_scores')) || {};
                if (scores[current_item]) {
                    if (scores[current_item][nick]) return msg;
                    scores[current_item][nick] = Object.keys(scores[current_item]).length === 1 ? 2 : 1;
                } else {
                    scores[current_item] = {};
                    scores[current_item][nick] = 3;
                }
                $.chat.send('[BLINDTEST] ' + nick + ' a trouvé la bonne réponse (+'+ scores[current_item][nick] +' points) !');
                scores.total = scores.total || {};
                scores.total[nick] = (scores.total[nick] || 0) + scores[current_item][nick];
                localStorage.setItem('blindtest_scores', JSON.stringify(scores));
            }
        } catch (e) {}
		return msg;
	},
    stop: blindtestPluginVar.stop
});