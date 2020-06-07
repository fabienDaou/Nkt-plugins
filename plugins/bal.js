

$.plugin({
            
    name: 'bal',
    
    onSend: function(msg){
        return this.replaceAll(msg, false);
    },
    
    onWrite: function(msg, nick) {
        return this.replaceAll(msg, true, nick);
    },
    
    
    replaceAll: function(msg, tags, nick) {
      
        if(typeof $.chat.balCount == 'undefined')
          $.chat.balCount = 0;
            
    
        //if (msg.charAt(0) != '/' && (!tags || (tags && nick)) && nick != $.chat.myNick()) {
        if(nick == $.chat.myNick()) {
          var odd = 3 * $.chat.nicks().length // Une chance sur ?
          var rd = Math.floor((Math.random() * odd) + 1)
          if(rd == odd) {
            setTimeout(function(){
              var balMsg = ["Venez on se retrouve tous au Bal des Anciens !", "Bah c'est le 6 juin banane!", "Oui la date limite pour s'inscrire c'est le 6 mai, DANS UNE SEMAINE !", "Justement j'allais te donner l'adresse: https://www.facebook.com/events/866754306718665/", "Tu ne peux pas louper le Bal des Anciens", "Alors c'est bon tu as payé en ligne https://www.billetweb.fr/bal-des-anciens1", "Le Bal des Anciens c'est l'occasion ou jamais de se faire une LAN", "Arthur vient de toute façon", "Un certain Collot vient aussi", "Franchement le Bal des Anciens ça va envoyer du lourd", "Je te raconte pas ce qu'on va se mettre en champagne", "En plus le cadre est vraiment magnifique pour le Bal des Anciens", "Ouais mais tu as vraiment une petite bite, le mec toute de suite y a 'Bal' et il a peur de devoir trouver une partenaire", "remarque ça te ferait pas de mal", "du coup https://www.billetweb.fr/bal-des-anciens1", "et pour la bouffe ça rigole pas", "https://www.billetweb.fr/bal-des-anciens1", "on sait jamais pour les coincer de la carte bleu https://www.billetweb.fr/bal-des-anciens1", "C'est le 6 JUIN. Deadline pour s'inscrire le 6 MAI ::: https://www.billetweb.fr/bal-des-anciens1", "ok je viens au bal", "venez aussi du coup", "j'ai payé en ligne pour le bal"]; 
              $.chat.send(balMsg[$.chat.balCount], 'test');
              $.chat.balCount += 1;
              if($.chat.balCount >= balMsg.length)
                $.chat.balCount = 0;
            }, 500+rd*1000);
          }
        }
        //}
        
        return msg;
    }
    
    
});