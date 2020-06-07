$.plugin({
    // VERSION 0.0.5
    name: 'NKTrad',
    
    onWrite: function(msg, nick) {
        return this.NKTrad(msg, true, nick);
    },
    
    
    NKTrad: function(msg, tags, nick) {        

        var DeFr =  {};
		DeFr.Flummi = 'BalleRebondissante';
		DeFr.Geist = 'Esprit';
		DeFr.Hund = 'Chien';
		DeFr.Bluffs = 'Flans';
		DeFr.Mädchen = 'Fille';
		DeFr.Pony = 'Poney';
		DeFr.Ziege = 'Chèvre';
		DeFr.Kohl = 'Chou';
		DeFr.Geschwindigkeit = 'Vitesse';
		DeFr.Ente = 'Canard';
		DeFr.Metzger = 'Charcutier';
		DeFr.Witwer = 'Veuve';
		DeFr.Sauerkraut = 'Choucroute';
		DeFr.Traum = 'Rêve';
		DeFr.Welt = 'Monde';
		DeFr.Kartoffel = 'PommeDeTerre';
		DeFr.Seelen = 'Ames';
		DeFr.Stern = 'Etoile';
		DeFr.Sonne = 'Soleil';


		DeFr.Besitzer = 'PropriétaireDe';
		DeFr.Dieb = 'VoleurDe';
		DeFr.König = 'RoiDe';
		DeFr.Kaiser = 'EmpereurDe';
		DeFr.Erfinder = 'InventeurDe';
		DeFr.Mörder = 'TueurDe';
		DeFr.Ficker = 'BaiseurDe';
		DeFr.Bändiger = 'DompteurDe';
		DeFr.Wärmer = 'ChauffeurDe';
		DeFr.Futter = 'CeQueBouffeLe';
		DeFr.Weh = 'DouleurDe';
		DeFr.Katastrophe = 'CatastropheDe';
		DeFr.Panik = 'PaniqueDe';
		DeFr.Meister = 'MaîtreDe';
		DeFr.Salat = 'SaladeDe';
		DeFr.Fresser = 'MangeurDe';
		DeFr.Saft = 'JusDe';
		DeFr.Begrenzung = 'LimiteDe';
		DeFr.Ritter = 'ChevalierDe';
		
		
        
        if (msg.charAt(0) != '/'  && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
            if(msg.indexOf("nennen") > -1)
                setTimeout(function(){
					var mots = [];
					for(var key in DeFr) 
						if(msg.indexOf(key) > -1)
							mots.push(DeFr[key]);
                    $.chat.write("Vous devriez vous appeler "+mots[1]+mots[0], 'NKTrad');
                }, 500);
        }
        
        return msg;
    }
});