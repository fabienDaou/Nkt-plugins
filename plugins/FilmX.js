$.plugin({
	name: 'FilmX',
  onWrite: function(msg, nick) {
      return this.FilmX(msg, true, nick);
  },
  FilmX: function(msg, tags, nick) {
    if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
      var LoFArray = ["Je suce une légende","Une rondelle a fait le printemps","20 000 vieux sur ta mere","Charlie et la choco-gaterie","Le retour de la sodomomie","Blanche Fesse et les sept mains","Le fabuleux vagin d'amélie bourrin","En pleine branlette","Le trou d'après","Trou détective","La rai moite si tu peux","Le pere noel en a une dure","Mange et démonte","Incestion","La plus grande cave a rais du monde","Les 12 coups de ma nuit", "Diner de fion", "la bourrée dans le pres", "Les avalés", "La belle et le gros dard", "Tapin au tibet", "Kuzko l'empalleur de mégalolos", "Le lance lolo du mac", "CumALot", "il est dans de la mère", "Le bossu dans votre dame", "Les 101 dames à seins","Harry plotteur et la croupe en feu","l'âne d’autriche","le seigneur de l'anneau: les deux trous"];
      if(msg.indexOf("film?") > -1 || msg.indexOf("porn") > -1 || msg.indexOf("porno") > -1 || msg.indexOf("cochon")> -1)
		    setTimeout(function(){
			    $.chat.write( LoFArray[Math.floor(Math.random() * LoFArray.length)], 'FilmX');
		    }, 500);
    }
    return msg;
  }
});