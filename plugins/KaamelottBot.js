$.plugin({
	name: 'KaamelottBot',
    
    onWrite: function(msg, nick) 
	{
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) 
	{
		var PercevalArray = ["Est-ce que vous l'entendez exactement au même volume que nous ?","Alors la mocheté, elle fait ce qu'on dit, et ELLE FERME SA BOITE A CACA!!","On en a gros","Quand même ils ont pas de bol les mecs, mettre au point un plan pareil, et tomber sur des cerveaux comme nous"];
		var LothArray = ["Si on cueille pas les cerises tant qu'elles sont sur l'arbre, on fera tintin pour le clafoutis","Tempora mori, tempora mundis recorda. Voilà, eh ben ça par exemple, ça ne veut absolument rien dire, mais l’effet reste le même...","Ave Cesar, rosae rosam, et spiritus rex ! Ah non, parce que là, j’en ai marre !","Sanctis recorda, sanctis deus rex.","Victoriae mundis et mundis lacrima. Bon, ça ne veut absolument rien dire, mais je trouve que c’est assez dans le ton.","Fiat minimis et patria.","Missa brevis et spiritus maxima. Ça ne veut rien dire, mais je suis très en colère contre moi-même ! ","Odi panem quid meliora. Ça veut rien dire, mais je trouve que ça boucle bien.","Nove sed non nova : la manière est nouvelle, mais non la matière. Citation que j’ai jamais pu replacer correctement dans une conversation.","(...) Et là, normalement, il me faut une citation latine, mais pfff... j’en ai marre !","Timeo libri rex agitur. Ça ne veut rien dire, mais c'est ce que j'ai trouvé de plus... aigre.","Retro peccat et rex domini. Y'a « retro », y'a « peccat », on peut vaguement en faire quelque chose."];
		var BurgondeArray = ["ARTHOUUUUUR, ARTHOUUUUUUUR ..... CUILLER","JOUEEER ... SALSIFIS","METEOOOOOOO","HAHA BIOGRAPHIE"];
		var CaradocArray = ["Les chicos c'est sacré, et celui qui me fera bouffer de la soupe il est pas né","On en a gros","Non mais c'est moi .. je pue des pieds, ça englobe un peu"];
        var YvainArray = ["Si elles nous piquent dans la gorge, on peut mourir j'vous ferais dire","Quand vous avez dit malédiction, j'ai fait une série de tout petits pets, comme ça *pfft pfft pfft*","Et là, il a enroulé sa quique autour du bâton !","Gavage"];
        var CadocArray = ["A Cadoc","Les pattes de canAAAAAAAAAAAAAAAAArds","Pour savoir d'où vient le vent faut mettre son doigt dans le cul du coq","Caradoc il s'occupe, mais c'est pas ma tatan"];
        var AttilaArray = ["Les femmes de Kaamelott, c'est les plus belles femmes du monde","Et pourquoi pas ?"];
        if (msg.charAt(0) != '/'  && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) 
		{
            if(msg.indexOf("Burgonde") > -1)
				setTimeout(function(){
					$.chat.write( BurgondeArray[Math.floor(Math.random() * BurgondeArray.length)], 'RoiBurgonde');
				}, 500);
	        if(msg.indexOf("Perceval") > -1)
				setTimeout(function(){
					$.chat.write( PercevalArray[Math.floor(Math.random() * PercevalArray.length)], 'Perceval');
				}, 500);
			if(msg.indexOf("Loth") > -1)
				setTimeout(function(){
					$.chat.write( LothArray[Math.floor(Math.random() * LothArray.length)], 'Loth');
				}, 500);
		    if(msg.indexOf("Caradoc") > -1)
				setTimeout(function(){
					$.chat.write( CaradocArray[Math.floor(Math.random() * CaradocArray.length)], 'Caradoc');
				}, 500);
            if(msg.indexOf("Yvain") > -1)
				setTimeout(function(){
					$.chat.write( YvainArray[Math.floor(Math.random() * YvainArray.length)], 'Yvain');
				}, 500);
            if(msg.indexOf("Cadoc") > -1)
				setTimeout(function(){
					$.chat.write( CadocArray[Math.floor(Math.random() * CadocArray.length)], 'Cadoc');
				}, 500);
            if(msg.indexOf("Attila") > -1)
				setTimeout(function(){
					$.chat.write( AttilaArray[Math.floor(Math.random() * AttilaArray.length)], 'Attila');
				}, 500);
        }
        
        return msg;
    }
});