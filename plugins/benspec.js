$.plugin({
	name: 'benspec',
  onWrite: function(msg, nick) {
      return this.benspec(msg, true, nick);
  },
  benspec: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1  && (!tags || (tags && nick))) {
      var BenArray = ["En effet le diamant est l'élément le plus dur en terme de dureté", "Tu es passé du coté Leader Price de la force", "franchement j'crois que Jeff c'le mec le plus intelligent que je connaisse","la conversation a duré deux minutes pendant un quart d'heure.","A cause du numerus clausus, comme le pere noel, haha. Non ca me faisait penser a Santa Claus.","La bush au sens buisson du terme.","j'ai remarqué que quand je mange une banane avant de faire une partie je suis meilleur","les mecs se baladent toujours a 5, on dirait les chicken nuggets", "Jeff c'est le Champollion du Weshwesh","Vous savez combien de souches du VIH peuvent tenir sur un dragibus ?","Prenez de la graine les gars!","Ca laisse une part.","OMG j'arrive j'ai un déguisement de méduse avec plein de tentacules","chui pas ce genre de blaireau là moi, je suis le genre de blaireau mort que tu ramasses après l'avoir percuté","T'as vu la liberté d'expression d'une souris ?","Je suis le gros pont entre Teamspeak et Skype.","Eh gros tu vas au chiottes on dirait que tu vas chez le dentiste mec.", "Jamais vu une game aussi zoo-tique. Non mais c'parce que j'pensais à un zoo","Ah ca la semaine pour bosser y a 0 incident mais quand tu peux enfin jouer bah la c'est la 3eme guerre mondiale.","Franchement Fabien c'est le mec le plus respectable que je connaisse.","J'aime bien quand tu fais la fille Djambi", "T'as mangé indien ou quoi ?","c'est pour ça qu'il avait l'air super vite", "on fait 1 ou 2 parties le temps que clavier pète son néné", "Franchement Jeff c'est le mec le plus négligé que je connaisse"];      
      if(msg.indexOf("BenQuote") > -1)
		    setTimeout(function(){
			    $.chat.write( BenArray[Math.floor(Math.random() * BenArray.length)], 'Ben');
		    }, 500);
    }
    return msg.replace(/\bpd\b/gi, 'coquin');
  }
});