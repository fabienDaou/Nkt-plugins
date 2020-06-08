$.plugin({
	name: 'cara',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
            if(msg.match(/pipo/i))
				setTimeout(function(){
					$.chat.write('<img src="https://i.imgur.com/AIUwc9j.gif" />', 'Eric');
				}, 500);
			if(msg.match(/deal with it/i))
				setTimeout(function(){
					$.chat.write('<img src="https://i.imgur.com/FZg7swa.gif" />', 'Qrthur');
				}, 500);	
			if(msg.match(/arquebusier/i))
				setTimeout(function(){
					$.chat.write('<img src="https://i.imgur.com/TJEVtU6.jpg" />', 'LordDaoulaS');
				}, 500);	
			if(msg.match(/bike/i))
				setTimeout(function(){
					$.chat.write(
						'<img src="https://www.google.fr/logos/doodles/2016/2016-doodle-fruit-games-day-7-5190998188621824-hp.gif" />',
						'Google'
					);
				}, 500);
			if(msg.match(/dogedarryck/i))
							setTimeout(function(){
								$.chat.write('<img src="https://i.imgur.com/Z9AZFX4.jpg" height=256/>', 'DogeDarryck');
							}, 500);
			if(msg.match(/salt/i))
							setTimeout(function(){
								$.chat.write('<img src="https://i.imgur.com/cSsJPKj.png" height=256/>', 'SaltJeff');
							}, 500);
			if(msg.match(/toque/i))
							setTimeout(function(){
								$.chat.write('<img src="https://i.imgur.com/kS5jlXd.jpg" height=256/>', 'ToqueJeff');
							}, 500);
			if(msg.match(/magus/i))
							setTimeout(function(){
								$.chat.write('<img src="https://i.imgur.com/XZpAqrd.jpg" height=256 title="fausse-fleur-lance-eau-arroser-rigolo-deguisement-accessoire-de-clown-pitreries-bouffon-farceur-asperger-doucher-mouiller-eau-tremper-inonder-amuser-faire-le-guignol-singeries-gugusse-comique-fantaisiste-artiste-acrobate-amuseur-humour"/>', 'Magus');
							}, 500);				
        }
        
        return msg;
    }
});