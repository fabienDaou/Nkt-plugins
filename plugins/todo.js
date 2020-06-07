$.plugin({
  name: 'todo',
  onWrite: function(msg, nick) {
    return this.talkBot(msg, true, nick)
  },
  init: function() {
  },
  talkBot: function(msg, tags, nick) {
    if (msg.charAt(0) !== '/' && (!tags || (tags && nick))) {
      var prefix = [
        'Camarades, je vous suggère ',
        'Il faut trouver un stagiaire pour faire '
      ]
      var todo = [
        'un plugin qui rename en NOM (GUIRLANDE) quand tu guirlandes.',
        'un plugin qui fetch des morceaux d\'anecdote de krako en fonction du sujet de conversation actuel.',
        'un plugin Propostino le clown rigolo.',
        'un NKT premium avec les plugins qui chargent plus vite.',
        'un plugin Doodle / sondages.',
        'un plugin QUIZZ',
        'un plugin pour reminder les todo avec: un /todo list, un /todo add ...etc',
        'une propriété de plugin "lazyLoadable" pour le rendre non bloquant à la connexion',
        'une meilleure gestion de l\'archivage des plugins (versioning...)'
      ]
      if (msg.indexOf('°todo') > -1 && msg.indexOf('plugin') === -1) {
         var index = parseInt(msg.split('°todo ')[1]);
         setTimeout(function () {
          $.chat.write(prefix[Math.floor(Math.random() * prefix.length)] + todo[index], 'todo')
        }, 500)
        return ''
      }
      if (Math.floor((Math.random() * $.chat.nicks().length * 500)) + 1 === 1) {
        setTimeout(function () {
          $.chat.send('°todo ' + Math.floor(Math.random() * todo.length))
        }, 500)
      }
    }
    return msg
  }
});