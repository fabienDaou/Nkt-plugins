$.plugin({
   name: 'selfBot',
   init: function() {
      $.pluginApi.loadPlugin('markovSrc');
     //var markovScript = document.createElement('script');
     //markovScript.src = "https://wzrd.in/standalone/markov-chains-text@latest";
     //document.getElementsByTagName('body')[0].appendChild(markovScript);
     setTimeout(function() {
       var markov = window.markovChainsText.default;
       $.chat.flemmeEngine = markov;
       $.chat.flemmeCorpus = '';
       $.chat.flemmeUpdate = 0;
     }, 500);
   }, 
   onWrite: function(msg, nick) {
       return this.TalkBot(msg, true, nick);
   },
   TalkBot: function(msg, tags, nick) {
       if (msg.indexOf('summonMe') > -1 && msg.indexOf('plugin') === -1 ) {
         try{
         $.chat.send($.chat.flemme.makeSentence());
         }catch(e){if(nick === $.chat.myNick()) $.chat.write('Pas assez parlé encore OU réessaye.', 'flemme');}
         return '';
       } else if(msg.charAt(0) != '/' && nick === $.chat.myNick()) {
         $.chat.flemmeCorpus += msg;
         $.chat.flemmeUpdate++;
       }
       if($.chat.flemmeUpdate === 10) {
         $.chat.flemmeUpdate = 0;
         $.chat.flemme = new $.chat.flemmeEngine(
           $.parseHTML($.chat.flemmeCorpus).map(function(a) {
             return $(a).text();
           }).join(". ")
         );
       }
       return msg;
   }
});