var nktrpgPlugin = function() {
    
    var _self = this

    _self.prefix = 'https://nktrpg.herokuapp.com'
    
    _self.init = function() {
        $.pluginApi.loadPlugin('IRCcmd')
        $.irc.addCmd({
            func: _self.nktrpg,
            description:'Use nktrpg API',
            proto:'/nktrpg [add|view] [sessions|session|event] [sessionTitle|sessionId] [eventLocation] [eventDescription]'
        }, 'nktrpg')
    }
    
    _self.stop = function() {
        $.irc.addCmd(null, 'nktrpg')
    }
    
    _self.nktrpg = function(cmd, params, source) {
      if (!source) {
        try {
          var args = params.split(' ')
          var actions = {
            add: _self.add,
            view: _self.view,
            default: _self.error
          }
          var arg = args[0];
          console.log(arg);
          (actions[arg] || actions.default)(args.splice(1))
        } catch(e) {console.log('caught');console.log(e)}
      }
      return ''
    }

    _self.error = function() {
      $.chat.write('Syntax error', 'nktrpg')
    }

    _self.add = function(args) {
      var types = {
        session: _self.addSession,
        event: _self.addEvent,
        default: _self.error
      }
      var arg = args[0];
      (types[arg] || types.default)(args.splice(1))
    }
	
    _self.view = function(args) {
      var types = {
        sessions: _self.viewSessions,
        default: _self.error
      }
      var arg = args[0];
      (types[arg] || types.default)(args.splice(1))
    }

    _self.addSession = function(args) {
      if (!args[0]) {
        return _self.error()
      }
      fetch(
        _self.prefix + '/session',
        {
          method: 'post',
          mode: 'cors',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({title: args[0]})
        }
      )
      .then(_self.parseApiRes)
      .catch(function(e) {
        console.log(e)
      })
    }
	
    _self.viewSessions = function(args){
      fetch(
        _self.prefix + '/sessions',
        {
          method: 'get',
          mode: 'cors',
        }
      )
      .then(_self.parseApiRes)
      .catch(function(e) {
        console.log(e)
      })
	}

    _self.parseApiRes = function(res) {
      $.chat.write(res.status + ' : ' + res.statusText, 'nktrpg')
    }
}


var nktrpgPluginVar = new nktrpgPlugin()
    
$.plugin({
    name: 'nktrpg',
    init: nktrpgPluginVar.init,
    onWrite: function(msg, nick) {
      if (msg.indexOf('/me') == 0 && nick == $.chat.myNick()) {
        msg = ''
      }
      return msg
    },
    stop: nktrpgPluginVar.stop
})