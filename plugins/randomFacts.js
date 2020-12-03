$.plugin({
	name: 'randomFacts',
    
    onWrite: function(msg, nick) {
		return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
		var factsArray = [];
		factsArray.push({sentence:"Facepalm.",author:"Kevin"});
		factsArray.push({sentence:"Non.",author:"Jeff"});
		factsArray.push({sentence:"VALENNNNNNNNNTAYN ?",author:"MecRelou"});
		factsArray.push({sentence:"Si vraiment vous en voulez plus... (non c'est pas ca...)",author:"Krako"});
		factsArray.push({sentence:"C'est note, cordialement.",author:"Loubiere"});
		factsArray.push({sentence:"Regle numero 1: la main dans le dos.",author:"Djambi"});
		factsArray.push({sentence:"Médé c'est un rugueux, ok ?",author:"Djambi"});
		factsArray.push({sentence:"Un probleme de registre ?",author:"Marques"});
		factsArray.push({sentence:"Et donc la le robot va tout droit. Hein ? 17/20 ?",author:"ProjetRobot"});
		factsArray.push({sentence:"haha viens on fait une startup de vente de papier de verre pour bigots aveugles",author:"Arthur"});
		factsArray.push({sentence:"Oh tiens Jeff est parti, je vais piquer sa chaise longue *BOOM*",author:"Arthur"});
		factsArray.push({sentence:"moi j'a laiché toute ma rage sur les gros au bord des canaux hier",author:"ElJefe"});
		factsArray.push({sentence:"et ajd j ai juste redémarré mon ordi pasque je retrouvais plus la souris",author:"bobi"});
		factsArray.push({sentence:"T'es aussi drole que Alexandre Astier quand il est tout seul",author:"Ben"});
		factsArray.push({sentence:"Bon ça m'saoule j'ferme tout. (à Fabien) ET OUI JE BROWSERIFY.",author:"Jeff"});
		factsArray.push({sentence:"Drink ? Fun ? ... Girls ? ..... Funny girls ?",author:"JapFragile"});
		factsArray.push({sentence:"Elle tombe tellement souvent qu'elle a déjà un parmesan sur la tête!",author:"Jeff"});
		factsArray.push({sentence:"EH BODDHY",author:"RandomBlackJap"});
		factsArray.push({sentence:"ceci je me ferais bien une ptite jeunette pour 50 boules",author:"Ney"});
		factsArray.push({sentence:"jsuis le mec quick and dirty",author:"Jeff"});
		factsArray.push({sentence:"je veux bien etre un bouche trou mais litteralement",author:"Ney"});
		factsArray.push({sentence:"jsuis le mec quick and dirty",author:"Jeff"});
		factsArray.push({sentence:"impec, une petite salade et jy retourne",author:"Jeff"});
		factsArray.push({sentence:"ptin en ce moment je pète des délires sur des tire bouchons",author:"Jeff"});
		factsArray.push({sentence:"Sinon on loue un turc a deux?",author:"Jeff"});
		factsArray.push({sentence:"Les gars s'il vous plait pas de metagaming",author:"Djambi"});
		factsArray.push({sentence:"Elle met des frites.",author:"Jeff"});
		factsArray.push({sentence:"ouais on peut te monter en flex pour trio/penta queue sur les mains",author:"Jeff"});
		factsArray.push({sentence:"Also I have a 2015 prius for rental.",author:"HostileBNB"});
		factsArray.push({sentence:"Break Point ?",author:"ElJefe"});
	    	factsArray.push({sentence:"J'étais avec KraK en medbay",author:"amongus"});
	    	factsArray.push({sentence:"Cet homme est parfaitement proportionné !",author:"PixCyan"});
	    	factsArray.push({sentence:"J’espère que Pixcyan mangera pas les pieds de Jeff",author:"LaJeffe"});
	    	factsArray.push({sentence:"Ckoi le fun ?",author:"ElJefe"});
	    	factsArray.push({sentence:"Ben c'est un peu un fromage.",author:"ElJefe"});
		
		
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
            if(msg.indexOf("random") > -1 && nick == $.chat.myNick()){
                var rnd = Math.floor(Math.random()*factsArray.length);
                $.chat.send('°quote '+rnd.toString());
            }
            else if(msg.indexOf('°quote') > -1) {
				var index = parseInt(msg.split('°quote ')[1]);
				setTimeout(function() {
					$.chat.write(factsArray[index].sentence,factsArray[index].author);
				}, 500);
				return '';
			}
			var lol = Math.floor(Math.random()*2000);
			if(!lol) $.chat.send('°quote 0');
			if(lol == 262) $.chat.send('°quote 1');
			if(lol == 1 && !(msg.length%3)) {
				$.chat.send('°quote 2');
				setTimeout(function(){
					$.chat.send('°quote 2');
					setTimeout(function(){
						$.chat.send('°quote 2');
						setTimeout(function(){
							$.chat.send('°quote 2');
						}, 20000);
					}, 8000);
				}, 2000);
			}
        }
        
        return msg;
    }
});
