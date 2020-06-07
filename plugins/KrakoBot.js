$.plugin({
	name: 'KrakoBot',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
		var KrakArray = ['Attendez les gars je fais un PPT', 'Attendez les gars je suis en train de vous acheter un cadeau mystère', 'Attendez les gars je fais un de Groodt', 'Attendez les gars je suis en train de vous passer des dogecoins', 'Attendez les gars j\'arrive pas a installer Eclipse', "Attendez les gars mon perso rush tout seul", "Attendez les gars j'peux rien faire", "Attendez les gars je finis mon assiette", "Attendez les gars je finis mon jeu de tarot", "Attendez les gars je finis mon croque monsieur", "Attendez les gars je lis un article sur cafaitgenre.org", "Attendez les gars je bouffe des slices de mon FPGA" , "Attendez les gars je drague une handicapée", "Attendez les gars je drague la fille de l'accueil", "Attendez les gars je lis sur les lèvres sans les lèvres", "Attendez les gars je repasse elec num.","Attendez les gars je suis en jour ouvré de glandouille organisée consentie par la hierarchie","Attendez les gars je fais des planeurs avec une meuf en fauteuil roulant","Attendez les gars je pull une charlie hebdo chez comsol france","Attendez les gars le fais un Doodle.","Attendez les gars je fais la route du rhum mais sans rhum", "Attendez les gars j'avais un blog feministe avec des temoignages de femmes agressées."];
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
            if(msg.indexOf("Krako?") > -1)
				setTimeout(function(){
					$.chat.write( KrakArray[Math.floor(Math.random() * KrakArray.length)], 'KrakoBot');
				}, 500);
        }
        
        return msg;
    }
});