var Stats = function() {
    
    var _self = this;
    
    var Term = function () {
        this.tf = 0;
        this.df = 0;
        this.value = '';
    };
    
    var User = function () {
        this.nbWords = 0;
        this.vocSize = 0;
        this.nick = '' ;
        this.terms = [] ;
    };
    
    var Tf = function () {
        this.value = 0 ;
        this.term = null ;
    };
    
    var _currentId = 0;
    var _terms = {};
    
    var _matrix = {};
    var _nbUser = 0;
    
    var _empty = ['a', 'l', 'le', 'la', 'un', 'une', 'me', 'ma', 'je', 'tu', 'il', 'on', 'nou', 'vou', 'mai', 'ou', 'et', 'donc', 'or', 'ni', 'car', 'en', 'de', 'mon', 'ma', 'j', 'ce', 'sa', 'ça', 'se', 'est', 'ai', '', 't', 'te', 'ta', 'que', 'du', 'c', 'ca', 'e'];
    
    
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.printStats, 
            description: 'Print stats on users', 
            proto: '/stats [nickname]'
        }, 'stats' );
    } ;
    
    _self.stop = function() {
        $.irc.addCmd(null, 'stats');
    };
    
    
    _self.onReceived = function(msg, nick) {
        
        var user = _matrix[nick];
        if (! user) {
            user = new User();
            user.nick = nick;
            _matrix[nick] = user;
            _nbUser = _nbUser + 1; 
        }
        
        
        if (msg.charAt(0) == '/' || msg.indexOf('<script>') != -1) {
            return msg;
        }
        return indexing(user, msg);
    };
    
    var indexing = function (user, msg) {
        
        var words = msg.split(/ |'|"|,|\.|!|\?|\(|\)|-|:/);
        
        for (var i in words) {
            
            var word = serialize (words[i]);
            
            if (_empty.indexOf(word) != -1) {
                continue;
            }
            
            // adding in knew words
            var term = _terms[word];
            if (!term) {
                term = new Term();
                term.value = word;
                _terms[word] = term;
            }
            
            // adding term in words used by the user
            var tf = user.terms[word];
            if (!tf) {
                tf = new Tf();
                tf.term = term ;
                user.terms[word] = tf;
                
                // incrementing the document frequency
                term.df = term.df + 1;
                user.vocSize = user.vocSize + 1;
            }
            
            // incrementing the term frequency
            tf.value = tf.value + 1;
            term.tf = term.tf + 1;
            
            user.nbWords = user.nbWords + 1 ;
        }
        return msg;
    };
    
    
    
    var serialize = function (word) {
        word = word.toLowerCase();
        word = word.replace(/à/g, 'a');
        word = word.replace(/â/g, 'a');
        word = word.replace(/é/g, 'e');
        word = word.replace(/è/g, 'e');
        word = word.replace(/ê/g, 'e');
        word = word.replace(/î/g, 'i');
        word = word.replace(/ô/g, 'o');
        word = word.replace(/û/g, 'u');
        word = word.replace(/ù/g, 'u');
        word = word.replace(/ee$/g, 'e');
        word = word.replace(/er$/g, 'e');
        word = word.replace(/s$/g, '');
        return word;
    };
    
    _self.printStats = function(cmd, params, source) {
        if (source) {
            return '/'+cmd+' '+params;
        }
        
        if (params && _matrix[params]) {
            printUserStats(_matrix[params]);
        } else {
            printGlobalStats();
        }
        return '';
    };
    
    
    
    
    // On a user stats
    
    var printUserStats = function(user) {
        var mostUsedWords = mostUsedBy(user);
        var nbDiffWords = user.vocSize;
        var keywordsArr = keywords(user);
        var nearest1 = nearstConsine(user);
        var nearest2 = nearstJaccard(user);
        var mostQuoted = mostQuotedBy(user);
        
        if (! $.irc.reversed) {
            $.chat.write('Mots les plus employés : ', '');
            $.chat.write(mostUsedWords.join(), '');
            $.chat.write('Mots clefs : ', '');
            $.chat.write(keywordsArr.join(), '');
            $.chat.write('Autres utilisateurs similaires algo1 :', '');
            $.chat.write(nearest1.join(), '');
            $.chat.write('Autres utilisateurs similaires algo2 : ', '');
            $.chat.write(nearest2.join(), '');
            $.chat.write('Nombre de mots différents utilisés : ', '');
            $.chat.write(nbDiffWords+'', '');
            $.chat.write('Utilisateurs les plus cités : ', '');
            $.chat.write(mostQuoted.join(), '');
        } else {
            $.chat.write(mostQuoted.join(), '');
            $.chat.write('Utilisateurs les plus cités : ', '');
            $.chat.write(nbDiffWords+'', '');
            $.chat.write('Nombre de mots différents utilisés : ', '');
            $.chat.write(nearest2.join(), '');
            $.chat.write('Autres utilisateurs similaires algo2 : ', '');
            $.chat.write(nearest1.join(), '');
            $.chat.write('Autres utilisateurs similaires algo1 :', '');
            $.chat.write(keywordsArr.join(), '');
            $.chat.write('Mots clefs : ', '');
            $.chat.write(mostUsedWords.join(), '');
            $.chat.write('Mots les plus employés : ', '');
        }
    }
    
    
    
    var mostUsedBy = function (user) {
        
        return getMaxs(
            5,
            user.terms,
            function(tf) {
                return tf.value;
            },
            function(tf) {
                return tf.term.value;
            }
        );
    };
    
    
    var keywords = function (user) {
        
        var avgdl = ComputeAvgdl();
        
        return getMaxs(
            5,
            user.terms,
            function(tf) {
                return bm25(tf, user, avgdl);
            },
            function(tf) {
                return tf.term.value;
            }
        );
    }
    
    var nearstConsine = function( user ) {
        return getMaxs(
            2,
            _matrix,
            function(user2) {
                return consineDist(user, user2);
            },
            function(user2) {
                return user2.nick;
            }
        );
    }
    
    var nearstJaccard = function( user ) {
        return getMaxs(
            2,
            _matrix,
            function(user2) {
                return jaccardDist(user, user2);
            },
            function(user2) {
                return user2.nick;
            }
        );
    }
    
    
    var mostQuotedBy = function (user) {
        
        var nicks = [];
        for (var i in _matrix) {
            nicks.push( serialize(i) );
        }
        if (nicks.indexOf('daoula') == -1) {
            nicks.push('daoula');
        }
        if (nicks.indexOf('krako') == -1) {
            nicks.push('krako');
        }
        if (nicks.indexOf('djambi') == -1) {
            nicks.push('djambi');
        }
        if (nicks.indexOf('jeff') == -1) {
            nicks.push('jeff');
        }
        if (nicks.indexOf('collot') == -1) {
            nicks.push('collot');
        }
        if (nicks.indexOf('qrthur') == -1) {
            nicks.push('qrthur');
        }
        return getMaxs(
            2,
            nicks,
            function(nick) {
                return (user.terms[nick]) ? user.terms[nick].value : 0 ;
            },
            function(nick) {
                return nick;
            }
        );
    }
    
    // Global stats
    
    var printGlobalStats = function () {
        var first = true;
        var mostTalky, mostQuoted, mostVoca ;
        
        for ( var nick in _matrix ) {
            var user = _matrix[nick];
            
            if( first ) {
                mostTalky = user ;
                mostQuoted = user ;
                mostVoca = user ;
                first = false;
            } else {
                
                if (user.vocSize > mostVoca.vocSize) {
                    mostVoca = user ;
                }
                
                if (user.nbWords > mostTalky.nbWords) {
                    mostTalky = user ;
                }
                
                if (! _terms[ serialize(mostQuoted.nick) ]) {
                    mostQuoted = user;
                } else if (_terms[ serialize(user.nick) ] && 
                    _terms[ serialize(user.nick) ].tf > _terms[ serialize(mostQuoted.nick) ].tf
                ) {
                    mostQuoted = user ;
                }
            }
        }
        
        if (first) {
            return;
        }
        
        var mostUsedWords = mostUsed();
        
        
        if (! $.irc.reversed) {
            // generic stats
            $.chat.write('Le plus bavard : ', '');
            $.chat.write(mostTalky.nick + ' (' + mostTalky.nbWords + ' mots)', '');
            
            if ( _terms[ serialize(mostQuoted.nick) ] ) {
                $.chat.write('Le plus cité : ', '');
                $.chat.write(mostQuoted.nick + ' (' + _terms[ serialize(mostQuoted.nick) ].tf + ' fois)', '');
            }
            $.chat.write('Avec le vocabulaire le plus fournis : ', '');
            $.chat.write(mostVoca.nick + ' (' + mostVoca.vocSize + ' mots)', '');
            
            $.chat.write('Mots les plus utilisés : ', '');
            $.chat.write(mostUsedWords.join(), '');
            
            $.chat.write('Le plus idiot : ', '');
            $.chat.write('Daoulas (2158 pts)', '');
            
        } else {
            $.chat.write('Daoulas (2158 pts)', '');
            $.chat.write('Le plus idiot : ', '');
        
            $.chat.write(mostUsedWords.join(), '');
            $.chat.write('Mots les plus utilisés : ', '');
            
            $.chat.write(mostVoca.nick + ' (' + mostVoca.vocSize + ' mots)', '');
            $.chat.write('Avec le vocabulaire le plus fournis : ', '');
            
            if ( _terms[ serialize(mostQuoted.nick) ] ) {
                $.chat.write(mostQuoted.nick + ' (' + _terms[ serialize(mostQuoted.nick) ].tf + ' fois)', '');
                $.chat.write('Le plus cité : ', '');
            }
            $.chat.write(mostTalky.nick + ' (' + mostTalky.nbWords + ' mots)', '');
            $.chat.write('Le plus bavard : ', '');
            
        }
    }
    
    
    var mostUsed = function () {
        return getMaxs(
            5,
            _terms,
            function(term) {
                return term.tf;
            },
            function(term) {
                return term.value;
            }
        );
    };
    
    
    
    // utilities 
    
    var getMaxs = function( nb, array, scoreCallback, finalElmtCallback ) {
        
        var scored = [];
        for ( var i in array ) {
            
            var elmt = array[i];
            scored.push({
                elmt: elmt,
                score: scoreCallback(elmt)
            });
        }
        
        scored.sort(function(a, b) {
            return (b.score - a.score);
        });
        
        var results = [];
        for( var i = 0; i < nb; i++ ){
            if( scored[i] ) {
                results.push( finalElmtCallback( scored[i].elmt ) );
            }
        }
        return results;
    };
    
    // https://en.wikipedia.org/wiki/Okapi_BM25
    var bm25 = function (tf, user, avgdl) {
        var k = 1.5;
        var b = 0.75;
        
        var idf = (_nbUser - tf.term.df + 0.5) / (tf.term.df + 0.5) ;
        idf = Math.log(idf);
        
        var num = tf.value * (k + 1);
        var denom = tf.value + k*(1 - b + (b*user.nbWords / avgdl)) ;
        return idf * num / denom ;
    };
    
    var ComputeAvgdl = function () {
        
        var sum = 0 ;
        for (var i in _matrix) {
           sum += _matrix[i].nbWords ; 
        }
        return sum / _nbUser ;
    };
    
    // https://en.wikipedia.org/wiki/Cosine_distance
    var consineDist = function (user1, user2) {
        
        var scalarProduct = 0;
        for (var i in user1.terms) {
            if( user2.terms[i] ) {
                scalarProduct += user1.terms[i].value * user2.terms[i].value ;
            }
        }
        
        return scalarProduct / (norm(user1) * norm(user2)) ;
    }
    
    var norm = function(user) {
        var norm = 0;
        for (var i in user.terms) {
            norm += user.terms[i].value * user.terms[i].value ;
        }
        return Math.sqrt(norm);
    }
    
    // https://en.wikipedia.org/wiki/Jaccard_index
    var jaccardDist = function (user1, user2) {
        
        var union = 0 ;
        for (var i in user1.terms) {
            if (user2.terms[i]) {
                union ++ ;
            }
        }
        
        return union / (user1.vocSize + user2.vocSize - union) ;
    }
    
};

var statsPlugin = new Stats();
    
$.plugin({
    name: 'stats',
    onReceived: statsPlugin.onReceived,
    init: statsPlugin.init,
    stop: statsPlugin.stop
});