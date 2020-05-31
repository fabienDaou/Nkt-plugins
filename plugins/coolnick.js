$.plugin({
	// VERSION 0.0.5
	name: 'coolnick',
    
    onWrite: function(msg, nick) {
        return this.TalkBot(msg, true, nick);
    },
    
    
    TalkBot: function(msg, tags, nick) {
        var coolnicks = [];
		coolnicks[0] = 	['',		'bold',		'bat',		'bed',		'',		'box',		'buck',		'',		'',		'',		'',		'',		'boom',		'bum',		'',		'bet',		'',		'bake',		'bool',		'',		'',		'bay',		'',		'ball',		'',		'bow',		'blown',		'',		'book',		'',		'',		'',		'blow',		'blue',		'black',		'bower',		'',		'bead',		'brick',		'',		'bound',		'',		'',		'beverage',		'bust',		'',		'blank',		'brain',		'',		'',		'',		'',		'bare',		'bard',		'',		'',		'',		'',		'',		'bing',		'',		'',		'',		'back',		'',		'boast',		'',		'',			'beat',	'',		'',		'bad',	'',		'',		'ban',	'greed'];	//B
		coolnicks[1] = 	['',		'cold',		'cat',		'',			'',		'cox',		'',			'',		'cut',	'',		'',		'',		'',			'',			'',		'',			'',		'cake',		'cool',		'',		'',		'',			'',		'call',		'',		'cow',		'clown',		'',		'cook',		'',		'',		'cage',	'',			'clue',		'',				'',				'cop',	'',			'crick',		'',		'',				'cry',	'',		'',					'',		'',		'clank',		'',				'',		'cast',	'cope',	'',		'care',		'card',		'',		'',		'',		'cap',	'',		'',			'',		'',		'',		'',			'chief','coast',	'crash',	'',			'',		'',		'core',	'',		'',		'cork',	'can',	'creed'];	//C
		coolnicks[2] =	['dice',	'',			'',			'',			'',		'',			'duck',		'',		'',		'dot',	'',		'',		'doom',		'',			'',		'',			'',		'',			'',			'',		'dock',	'day',	'dire',		'',			'dog',		'',		'',				'',			'',		'',		'drench','',	'',			'',			'',				'',				'',		'dead',		'',				'daze',	'',				'dry',	'',		'',				'dust',		'',		'',				'drain',		'',		'',		'dope',	'',		'dare',		'dard',		'',	'date',		'',		'',		'',		'ding',		'ditch','',		'',		'',			'',		'',			'',			'donkey',	'',		'do',	'',		'dad',	'deal',	'dork',	'',		''];		//D
		coolnicks[3] =	['',		'fold',		'fat',		'fed',		'',		'fox',		'',			'',		'',		'',		'fame',	'',		'',			'',			'fun',	'',		'fight',	'fake',		'fool',		'food',	'',		'',		'fire',		'fall',		'fog',		'',		'',				'',		'',			'',		'french','',	'flow',		'flue',		'',				'',				'',		'',			'',				'',		'found',		'fry',	'fail',	'',				'',			'',		'flank',		'',				'',		'fast',		'',	'fair',	'fare',		'',		'free',	'fate',		'face',	'',		'',		'',			'',		'',		'faint','',			'',		'',			'',			'',			'feat',	'',		'fore',	'',		'',		'fork',	'fan',	''];		//F
		coolnicks[4] =	['',		'',			'',			'',		'gift',		'',			'',			'',		'gut',	'',		'game',	'',		'',			'gum',		'gun',	'get',	'',			'',			'',			'good',	'',		'',			'',			'',		'',		'',			'',				'gray',	'',			'',		'',		'',		'glow',		'glue',		'',				'',				'',		'',			'',				'gaze',	'',				'',		'',		'',				'gust',	'gunner',	'',				'grain',		'',			'',		'',		'',		'',		'',			'',	'gate',		'',		'gap',	'',		'',			'',		'gain',	'',		'',			'',		'',			'',			'',			'',		'go',	'gore',	'',		'',		'',		'',		'greed'];	//G
		coolnicks[5] =	['',		'',			'',			'',			'',		'',			'',			'hen',	'',		'',		'',		'',		'',			'',			'',		'',		'',			'',			'',			'',		'',		'',		'hire',		'hall',		'hog',	'',			'',				'',		'hook',		'',		'',		'',		'',			'',			'',				'',				'hop',	'head',		'',				'haze',	'hound',		'',		'',		'',				'',			'',		'',				'',				'',		'',		'hope',	'hair',		'',		'hard',		'',	'hate',		'',		'',		'',		'',			'hitch','',		'',		'hack',		'',		'',			'',			'',			'heat',	'',		'',		'',		'heal',	'',		'',		''];		//H
		coolnicks[6] =	['',		'',			'',			'',			'',		'',			'',			'',		'',		'',		'',		'',		'',			'',			'',		'jet',	'',			'',			'',			'',		'',		'',			'',		'',			'',		'',			'',				'',		'',			'',		'',		'',		'',			'',			'',				'',				'',		'',			'',				'',		'',				'',		'',		'',				'just',		'',		'',				'',				'',		'',		'',		'',		'',			'',			'',		'',		'',		'',		'',		'',			'',		'',		'',		'jack',		'',		'',			'',			'',			'',		'',		'',		'',		'',		'',		'',		''];		//J
		coolnicks[7] =	['',		'',			'',			'led',	'lift',		'',			'luck',		'',		'',		'lot',	'lame',	'loon',	'loom',		'',			'',		'let',	'light',	'lake',		'',			'',		'lock',	'lay',		'',		'',			'log',	'low',		'',				'',		'look',	'lotion',	'',		'',		'',			'',			'',				'lower',		'',		'lead',		'',				'laze',	'',				'',		'',		'leverage',		'lust',		'',		'',				'',				'',		'last',	'',		'lair',	'',			'lard',		'',	'late',		'',		'lap',	'',		'',			'',		'',		'',		'lack',		'',		'',			'',			'',			'',		'',		'lore',	'',		'',		'',		'lan',	''];		//L
		coolnicks[8] =	['',		'',			'',			'',			'',		'',			'',			'men',	'',		'',		'',		'moon',	'',			'',			'',		'met',	'might',	'make',		'',			'mood',	'mock',	'may',		'',		'mall',		'',		'',			'',				'',		'',		'motion',	'',		'mage',	'',			'',			'',				'mower',		'',		'',			'',				'maze',	'',				'',		'mail',	'',				'must',		'',		'',				'',				'',		'',		'',		'',		'',			'',			'',	'mate',		'',		'map',	'metro','',			'',		'main',	'',		'',			'',		'',			'',			'monkey',	'meat',	'',		'more',	'mad',	'meal',	'',		'man',	''];		//M
		coolnicks[9] =	['',		'',			'',			'',			'',		'',			'',			'',		'nut',	'not',	'name',	'',		'',			'',			'',		'net',	'night',	'',			'',			'',		'',		'',			'',		'',			'',		'',			'',				'',		'',		'notion',	'',		'',		'',			'',			'',				'',				'',		'',			'',				'',		'',				'',		'nail',	'',				'',			'',		'',				'',				'',		'',		'nope',	'',		'',			'',			'',		'',		'',		'nap',	'',		'',			'',		'',		'',		'',			'',		'',			'',			'',			'neat',	'no',	'',		'',		'',		'',		'',		''];		//N
		coolnicks[10] =	['',		'',			'',			'',			'',		'',			'',			'pen',	'',		'pot',	'',		'',		'',			'',			'',		'pet',	'',			'',			'pool',		'',		'',		'pay',		'',		'',			'',		'',			'',				'pray',	'',		'potion',	'',		'page',	'plow',		'',			'',				'power',		'pop',	'',			'prick',		'',		'pound',		'pry',	'',		'',				'',			'',		'plank',		'',				'plain','past',	'pope',	'pair',	'',			'',			'',		'',		'pace',	'',		'',		'ping',		'pitch','pain',	'paint','pack',		'',		'',			'',			'',			'',		'',		'',		'pad',	'',		'pork',	'pan',	''];		//P
		coolnicks[11] =	['rice',	'',			'rat',		'red',	'rift',		'',			'',			'',		'',		'',		'',		'',		'',			'',			'run',	'',		'right',	'',			'',			'',		'rock',	'ray',		'',		'',			'',		'row',		'',				'',		'',		'',			'',		'rage',	'',			'',			'',				'',				'',		'read',		'',				'raze',	'round',		'',		'rail',	'',				'rust',	'runner',	'',				'',				'',		'',		'rope',	'',		'',			'',			'',	'rate',		'race',	'rap',	'retro','ring',		'',		'rain',	'',		'rack',		'',		'',			'',			'',			'',		'',		'',		'',		'real',	'',		'',		''];		//R
		coolnicks[12] =	['',		'',			'',			'',			'',		'',			'',			'',		'',		'',		'same',	'soon',	'',			'sum',		'sun',	'set',	'sight',	'sake',		'',			'',		'sock',	'say',		'',		'',			'',		'',			'',				'',		'',		'',			'',		'sage',	'slow',		'',			'slack',		'',				'',		'',			'',				'',		'sound',		'',		'sail',	'',				'',			'',		'',				'',				'slain','',		'',		'',		'',			'',			'',		'',		'',		'',		'',		'sing',		'',		'',		'saint','',			'',		'',			'',			'',			'seat',	'so',	'',		'sad',	'seal',	'',		'',		''];		//S
		coolnicks[13] =	['',		'',			'',			'',			'',		'',			'',			'ten',	'',		'',		'tame',	'toon',	'',			'',			'',		'',		'tight',	'take',		'tool',		'',		'',		'',			'',		'tall',		'',		'',			'',				'tray',	'took',	'',			'trench',	'',	'',			'',			'',				'tower',		'top',	'',			'trick',		'',		'',				'try',	'tail',	'',				'',			'',		'',				'train',		'',		'',		'',		'',		'',			'tard',	'tree',		'',		'',		'tap',	'',		'',			'',		'',		'taint','',			'thief','toast',	'trash',	'',			'',		'to',	'',		'tad',	'',		'',		'tan',	''];		//T
		coolnicks[14] =	['',		'',			'',			'',			'',		'',			'',			'',		'',		'',		'',		'',		'',			'',			'',		'wet',	'',			'wake',		'',			'wood',	'wock',	'way',	'wire',		'wall',		'',		'',			'',				'',		'',		'',			'wrench','wage','',			'',			'',				'',				'',		'',			'',				'',		'wound',		'',		'wail',	'',				'',			'',		'',				'',				'',		'',		'',		'',		'ware',		'ward',		'',		'',		'',		'',		'',		'',			'witch','',		'',		'',			'',		'',			'',			'',			'',		'',		'',		'',		'weal',	'work',	'',		''];		//W
		
		var square = [], line = [], col = [];
		
		do{
			line[0] = Math.floor(Math.random() * coolnicks.length);
			col[0] = Math.floor(Math.random() * coolnicks[line[0]].length);
			square[0] = coolnicks[line[0]][col[0]];
			col[1] = Math.floor(Math.random() * coolnicks[line[0]].length);
			square[1] = coolnicks[line[0]][col[1]];
			line[1] = Math.floor(Math.random() * coolnicks.length);
			square[2] = coolnicks[line[1]][col[1]];
			square[3] = coolnicks[line[1]][col[0]];
		}while((!square[0] || !square[1] || !square[2] || !square[3]) || (square[0] == square[1] || square[0] == square[2] || square[0] == square[3] || square[1] == square[2] || square[1] == square[3] || square[2] == square[3]));
		for(var i in square)
			square[i] = square[i].charAt(0).toUpperCase() + square[i].slice(1);
		
		if (msg.charAt(0) != '/'  && msg.indexOf('plugin') === -1 && (!tags || (tags && nick))) {
            if(msg.indexOf("coolnick") > -1)
				setTimeout(function(){
					$.chat.write(square[0]+square[2]+' | '+square[1]+square[3]+' | '+square[2]+square[0]+' | '+square[3]+square[1], 'coolnick');
				}, 500);
        }
        
        return msg;
    }
});