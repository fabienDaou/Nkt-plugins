$.plugin({
	name: 'BaitKrako',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
		var FilleArray = ["Elle est rousse?","Est-ce qu'elle a des taches de rousseur?"];
		var TarotArray = ["Ya plus de cartes j'ai tout bouffé"];
		var MarineArray = ["Jte jure elle a mis un coeur à la fin de son message, c'est bon c'est dans la poche"];
		var TheseArray = ["Nan mais là je bosse les gars jvous jure","Mais en vrai les PPT ça demande vraiment beaucoup de boulot"];
		var HunieArray = [
			"Nan mais je joue pas que pour le plot, les phases candy crush sont vraiment intéressantes",
			"Faudrait que je m'y remette, j'ai pas encore 100%, j'ai pas acheté tous les cadeaux aux gonzesses",
			"Quand meme, Momo a beau etre une chatte, elle est quand meme vachement mignonne"
		];
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
			var random = Math.random()*100
            if((msg.indexOf("fille") > -1) || (msg.indexOf("femme") > -1) || (msg.indexOf("meuf") > -1) )
				setTimeout(function(){
					if(random>65){ $.chat.write(FilleArray[Math.floor(Math.random() * FilleArray.length)], 'Krako');
					if(Math.random()>88) $.chat.write( "Bordel Krako t'es viré", 'Jeff');}
				}, 500);
			if((msg.indexOf("tarot") > -1))
				setTimeout(function(){
					$.chat.write(TarotArray[Math.floor(Math.random() * TarotArray.length)], 'Krako');
				}, 500);
			if((msg.indexOf("Marine") > -1) || (msg.indexOf("marine") > -1))
				setTimeout(function(){
					if(random>75){$.chat.write(MarineArray[Math.floor(Math.random() * MarineArray.length)], 'Krako');}
				}, 500);
			if((msg.indexOf("these") > -1) || (msg.indexOf("thèse") > -1))
				setTimeout(function(){
					if(random>65){$.chat.write(TheseArray[Math.floor(Math.random() * TheseArray.length)], 'Krako');}
				}, 500);
			if(
				(msg.indexOf("HuniePop") > -1)
				|| (msg.indexOf("Huniepop") > -1)
				||(msg.indexOf("huniepop") > -1)
				||(msg.indexOf("huniePop") > -1)
			)
				setTimeout(function(){
					$.chat.write(HunieArray[Math.floor(Math.random() * HunieArray.length)], 'Krako');
				}, 500);
        }
        
        return msg;
    }
});