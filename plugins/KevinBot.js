$.plugin({
	name: 'KevinBot',
	
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },

    TalkBot: function(msg, tags, nick) {
		var lolArray = ["Les nouveaux items ils sont OP","Vous avez vu les nouveaux items ?", "Garen top OP"];
		
        if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
			var written = 0;
			if( /\b(C|c)omment\b/i.test(msg) && /\bapp?ell?e(s|nt)?\b/i.test(msg) && nick != "Nessa" && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "Je crois qu'ils s'appellent Patanouk et Gersiflet, c'est possible ou pas ?", "Nessa");
				}, 500);
				setTimeout(function(){
					$.chat.write( "Y'en a un qu'est plus grand que l'autre", "Nessa");
				}, 3000);
				written = 1;
			}
            if(/\bpas\b\s*((\btr(e|è¨)s\b\s*)|\bvraiment\b\s*)*(\bdr(o|Ã´)les?\b|\bmarrante?s?\b)/i.test(msg) && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "Mais forcement c'est sans alcool !", "Merlin");
				}, 500);
				written = 1;
			}
            if(/\bgras\b/i.test(msg) && nick != "Karadoc" && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "Le gras, c'est la vie.", "Karadoc");
				}, 500);
				written = 1;
			}
            if(/\bpoint\b\s*\bmort\b/i.test(msg) && nick != "Arthur" && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "Mais ca fait 10 ans que ca dure votre histoire vous vous etes pas fait une bise sur le front venez pas me demander si c'est au point mort !", "Arthur");
				}, 500);
				written = 1;
			}
			if(/(manger*|bouffer*).*(graine)/i.test(msg) && nick != "MaitreDArmes" && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "JE NE MANGE PAS DE GRAINES !!!", "MaitreDArmes");
				}, 500);
				written = 1;
			}
			if(/\ble code\b/i.test(msg) && nick != "Perceval" && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "Mais le code, c'est pas \"le code\" ?", "Perceval");
				}, 500);
				written = 1;
			}
			if(/\benseign(ante?s?|er|e|ee?s?)\b/i.test(msg) && nick != "Perceval" && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "VOUS VOUS PRENEZ POUR UN ENSEIGNANT ?", "Perceval");
				}, 500);
				written = 1;
			}
			if( (/\btourr?ell?es*\b/i.test(msg) && /lanes?\b/i.test(msg)) || /\blcs\b/i.test(msg) || /\bgank\b/i.test(msg))
			{
				setTimeout(function(){
					$.chat.write(lolArray[Math.floor(Math.random() * lolArray.length)], 'Kevin');
				}, 500);
				written = 1;
			}
			if( /\bcriti(k+|que)s*\b/i.test(msg) && written == 0)
			{
				setTimeout(function(){
					$.chat.write( "TIIIIQUE !", "CRI");
				}, 500);
				written = 1;
			}
			if(/\bmauvaise\b\s\bfoie?s?\b/i.test(msg) && nick != "Leodagan")
			{
				setTimeout(function(){
					$.chat.write("Face a la mauvaise foi y\'a qu\'le mepris. Ou une claque dans le nez mais la...", 'Leodagan');
				}, 500);
				written = 1;
			}
			if( (/\bsuperstiti(on|eux?)\b/i.test(msg) || /\bpoisse\b/i.test(msg)) && nick != "Perceval")
			{
				setTimeout(function(){
					$.chat.write("La superstition c'est comme ceux qui rÃ©parent les fauteuils, il faut que le bois qu'ils rajoutent soit a peu pres comme l'autre bois sinon ca se voit trop.", 'Perceval');
				}, 500);
				written = 1;
			}
			if( /\bcompot(e|ier)s?\b/i.test(msg) && nick != "Daoulas" && nick != "Arthur")
			{
				setTimeout(function(){
					$.chat.write("Mais enfin on est en mission furtive, bon Dieu, qu'est-ce que vous venez nous emmerder avec le compotier de votre grand-mere ?", 'Arthur');
				}, 500);
				written = 1;
			}
			if( (/\bbonheur\b/i.test(msg) || /\bjoie\b\s\bde\b\s\bvivre\b/i.test(msg)) && nick != "Karadoc")
			{
				setTimeout(function(){
					$.chat.write("La joie de vivre ! La joie de vivre et le jambon !!! Il y a pas 36 recettes du bonheur !", 'Karadoc');
				}, 500);
				written = 1;
			}
			if( (/\bet\b\s*\bdonc\b\s*\?/i.test(msg) || /\bdu\b\s*\bcoup\b\s*\?/i.test(msg)) && nick != "Karadoc")
			{
				setTimeout(function(){
					$.chat.write("C'est de la merde.", 'Karadoc');
				}, 500);
				written = 1;
			}
			if( (/\btrompe\b\s*\bpas\b/i.test(msg)) && nick != "Roparzh")
			{
				setTimeout(function(){
					$.chat.write("Y'a un signe qui trompe pas: toutes ses betes sentent la pisse !", 'Roparzh');
				}, 500);
				setTimeout(function(){
					$.chat.write("ET PIS FORT !!!", 'Roparzh');
				}, 2000);
				written = 1;
			}
			if( (/\bintell?igente?s?\b/i.test(msg)) && nick != "Ben")
			{
				setTimeout(function(){
					$.chat.write("franchement j'crois que Jeff c'le mec le plus intelligent que je connaisse", 'Ben');
				}, 500);
				written = 1;
			}
			if( (/\.(jpg|png)/i.test(msg)) && (/img src/i.test(msg))==false)
			{
				setTimeout(function(){
					$.chat.write("Integration or GTFO !!!", 'NKTAdmin');
				}, 500);
				written = 1;
			}
			if(/moll?ett?e/i.test(msg))
			{
				setTimeout(function(){
					$.chat.write("Avec un ami ?", 'Nene');
				}, 500);
				written = 1;
			}
        }
        return msg.replace(/\bpsychologiqu/g, 'agricol').replace(/sourde oreille/g, 'sourde oreille').replace(/\bgg\b/gi, 'mon pied au cul').replace(/100\%/g,'1000ù');
    }
});