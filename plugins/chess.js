(()=>{
var chessPlugin = function () {
    
    var _self = this ;
    var proto = '/chess [opponentNick]';
    
    _self.init = function () {
        $.pluginApi.loadPlugin('IRCcmd');
        $.irc.addCmd({ 
            func: _self.chess, 
            description:'Défiez un rugueux au échecs !', 
            proto: proto
        }, 'chess');
    };
    
    _self.stop = function() {
        $.irc.addCmd(null, 'chess');
	};
	
	
	/** Variables and board state **/
	var dragSrcEl = null;
	var boardState = {};
	var allowedMoves = [];
	var moveHistory = '';
	var turnCount = 0;
	var currentPlayer = '1';
	var hcMode = false;
	var useTimer = false;
    
    /**
     * Action of command /chess
     * @param string cmd Command
     * @param string params End of the command
     * @param object source User who send the command (null if current)

     */
    _self.chess = function (cmd, params, source) {
		if( !source ) { try{

			var words = params.split(' ');
			if ($.chat.nicks().indexOf(words[0]) === -1) {
				throw new Error('adversaire introuvable');
			}
            players.push($.chat.myNick());	
			scores[$.chat.myNick()] = 0;	
			let opponent = words[0];
			players.push(opponent);					
			currentPlayer = "1";
			$.chat.send('°chessgame init ' + opponent);
			// generate board on click
			$.chat.write('  <style>'+
            '.chess-board { border-spacing: 0; border-collapse: collapse; }'+
            '.chess-board th { padding: .5em; }'+
            '.chess-board td { border: 2px solid black; width: 2em; height: 2em; }'+
            '.chess-board .light { background: #dad8d8; }'+
            '.chess-board .dark { background: #2f99cc; }'+
            'td{text-align:center;font-weight: bold;font-size: x-large;}'+
			'.highlight{border: 3px solid #47ff95!important;}'+
			'div[player="1"] {'+
			'  color: white;'+
			'}div[player="2"] {'+
			'  color: black;'+
			'}</style>'+
			'<table class="chess-board"><tbody id="board"></tbody></table><div id="messages"></div><script>$.chat.generateBoard("'+$.chat.myNick()+'","'+opponent+'")</script>', "chessbot");
			/*setTimeout(()=>{					
				generateBoard();
			}, 500);*/
			return '';

		} catch(e) {
			$.chat.write(e.toString(),'chessbot');
			return '';
		}}
		return '';
	};

	_self.onWrite = function(msg, nick) {
		if (msg.charAt(0) != '/' && msg.indexOf('plugin') === -1) {
			if (msg.indexOf('°chessgame') > -1) {
				if(msg.indexOf("init") > -1){
					console.log("I am in init for "+ nick);
					let opponent;
					//c'est quoi cette boucle?
					for (let nick of $.chat.nicks()) {
						if (msg.indexOf(nick) > -1) {
							opponent = nick;
							break;
						}
					}
					if(players[0] ===  $.chat.myNick()){return ""};
					players = [nick,$.chat.myNick()];
					$.chat.write('  <style>'+
					'.chess-board { border-spacing: 0; border-collapse: collapse; }'+
					'.chess-board th { padding: .5em; }'+
					'.chess-board td { border: 2px solid black; width: 2em; height: 2em; }'+
					'.chess-board .light { background: #dad8d8; }'+
					'.chess-board .dark { background: #2f99cc; }'+
					'td{text-align:center;font-weight: bold;font-size: x-large;}'+
					'.highlight{border: 3px solid #47ff95!important;}'+
					'div[player="1"] {'+
					'  color: white;'+
					'}div[player="2"] {'+
					'  color: black;'+
					'}</style>'+
					'<table class="chess-board"><tbody id="board"></tbody></table><div id="messages"></div><script>$.chat.generateBoard("'+$.chat.myNick()+'","'+opponent+'")</script>', "chessbot");
				}
				else if(msg.indexOf("cancel") > -1){
					//todo clear board
				}
				else if(msg.indexOf("state") > -1){
					console.log("[chess] : board state update from "+nick )
					console.log(players.join(" "));
					//Get current player index
					console.log("currentPlayer "+currentPlayer);	
					//on ne met pas a jour le board si le move vient du meme joueur
					if(nick ===  $.chat.myNick()){return ""};					
					const regex = /state ([a-h][1-8])([a-h][1-8])/gi;	
					//extract the move information : source position and target position
					var match = regex.exec(msg);
					console.log(match)
					if (match){
						//update board state with source/target position
						_self.updateBoard(match[1],match[2]);
						console.log("[chess] : board state update. completed.")
					}
					var playerIndex = players.indexOf($.chat.myNick());	
					//Increment index turn to allow next player to play
					if(playerIndex > -1){
						//set currentPlayer to the current player in the game that juste received a move from opponent.
						currentPlayer = (1 + (playerIndex + 2) % players.length).toString();
					}			
				}
		  
				//Deal with data sent to update the board state
				return '';
			}
		}
		return msg;
	};

	/** Pieces collection for init/reset **/
    var pieces = {
		"11" : { "n" : "R" , p :"1",u: "&#9814"},
		"12" : { "n" : "N" , p :"1",u: "&#9816;"},
		"13" : { "n" : "B" , p :"1",u: "&#9815;"},
		"14" : { "n" : "Q" , p :"1",u: "&#9813"},
		"15" : { "n" : "K" , p :"1",u: "&#9812"},
		"16" : { "n" : "B" , p :"1",u: "&#9815"},
		"17" : { "n" : "N" , p :"1",u: "&#9816;"},
		"18" : { "n" : "R" , p :"1",u: "&#9814;"},
		"2." : { "n" : "" , p :"1",u: "&#9817;"},
		"7." : { "n" : "" , p :"2",u: "&#9817;"},
		"81" : { "n" : "R" , p :"2",u: "&#9814"},
		"82" : { "n" : "N" , p :"2",u: "&#9816;"},
		"83" : { "n" : "B" , p :"2",u: "&#9815;"},
		"84" : { "n" : "Q" , p :"2",u: "&#9813"},
		"85" : { "n" : "K" , p :"2",u: "&#9812"},
		"86" : { "n" : "B" , p :"2",u: "&#9815"},
		"87" : { "n" : "N" , p :"2",u: "&#9816;"},
		"88" : { "n" : "R" , p :"2",u: "&#9814;"},	
	};

	var pieceValue = {
		"R":5,
		"N":3,
		"B":3,
		"Q" :9,
		"" :1
	};

	var scores = {};
	var players = [];
	var cols = [];

	/** generate board */
	_self.generateBoard = function (nick1, nick2){
		const viewOnly = nick1 !== $.chat.myNick() && nick2 !== $.chat.myNick();
		//TODO HERE CHECK IF ALREADY HAS BOARD STATE AND DRAW IT
		// FOR CLICK TO HIDE/SHOW
		let board = document.getElementById("board");
		for(let i = 0 ; i < 9;i++){
			const tr = document.createElement("tr");		
			for(let j = 0 ; j < 9; j++){
				let td = document.createElement("th");
				let position = String.fromCharCode("a".charCodeAt(0)+j-1);
				if(i===0){
					if(j!==0){
						td.textContent = position;
					}				
				}else if(j===0){
					td =  document.createElement("th");
					td.textContent = 9-i;
				}else{
					td = document.createElement("td");
					td.classList.add(((i+j)%2===0)?"light":"dark");
					td.id = position+(9-i);
					if(!viewOnly){
						td.setAttribute("draggable","true");					
						td.addEventListener('dragstart', handleDragStart, false);
						td.addEventListener('dragenter', handleDragEnter, false);
						td.addEventListener('dragover', handleDragOver, false);
						td.addEventListener('dragleave', handleDragLeave, false);
						td.addEventListener('drop', handleDrop, false);
						td.addEventListener('dragend', handleDragEnd, false);
					}	
					
					//Fill in with board pieces
					let piece = pieces[(i===2||i===7)?i+".":(i+""+j)];
					if(piece){
					   let div = document.createElement("div");
						div.setAttribute("piece",piece.n);
						div.setAttribute("player",piece.p);
						div.innerHTML = piece.u;
						td.appendChild(div);				
					}
					
				}		
				cols.push(td);	
				tr.appendChild(td);
			}
			board.appendChild(tr);
		}
	};

	var message = function(text){
		document.getElementById("messages").innerHTML=text;
	};
	
	var displayScore = function(text){
		document.getElementById("messages").innerHTML = "<p>"+players[0]+" : "+scores[players[0]]+" pts</p><p>"+players[1]+" : "+scores[players[1]]+" pts</p>";
	};
	
	var pointsEarnedFromMove = function(content, player){
		const regex = /piece="(\w*)"/gi;
	
		//check if a piece was taken
		var match = regex.exec(content);
		//update player score for taken piece
		if(match[1]){
			scores[player] += pieceValue[match[1]];
			displayScore();
		}	

				
	}

	//Check allowed moves given a piece and a position
	var highlightAllowedMoves = function(piece,position,player){
		allowedMoves=[];
		var x = position[0];
		var y = parseInt(position[1]);
		//Si c'est un pion
		if(piece === ""){
			
			var down = player==="1"?1:-1;
			let pos = x+(y+(-1)*down);
			let elem = document.getElementById(pos);
			if(elem && !elem.hasChildNodes()){
				allowedMoves.push(pos);	
			}
			
			pos = String.fromCharCode(x.charCodeAt(0)+1)+(y+(-1)*down);
			elem = document.getElementById(pos);
			if(elem && elem.hasChildNodes() && elem.firstChild.getAttribute("player") !== player){
				allowedMoves.push(pos);	
			}
			
			pos = String.fromCharCode(x.charCodeAt(0)-1)+(y+(-1)*down);
			elem = document.getElementById(pos);
			if(elem && elem.hasChildNodes() && elem.firstChild.getAttribute("player") !== player){
				allowedMoves.push(pos);	
			}
			
			//Si le pion est sur sa case de départ
			if(y===7 ||y===2){
				allowedMoves.push(x+(y+(-2)*down));
			}	
			
		}
		//Si c'est une tour
		if(piece === "R" || piece === "Q"){
			for(let i = 1 ; i <= 8 ;i++){
				let pos = String.fromCharCode(x.charCodeAt(0)+i)+y;			
				if (checkBreakLimits(pos,player,allowedMoves))break;	
				
			}
			for(let i = 1 ; i <= 8 ;i++){
				let pos = String.fromCharCode(x.charCodeAt(0)-i)+y;
				if (checkBreakLimits(pos,player,allowedMoves))break;	

			}	
			for(let i = 1 ; i <= 8 ;i++){
				let pos = x+(y+i);
				if (checkBreakLimits(pos,player,allowedMoves))break;	
				
			}	
			for(let i = 1 ; i <= 8 ;i++){
				let pos = x+(y-i);
				if (checkBreakLimits(pos,player,allowedMoves))break;	
			}		
		}
		
		//Si c'est un cavalier
		if(piece === "N"){
			let pos = String.fromCharCode(x.charCodeAt(0)+1)+(y+2);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)+2)+(y+1);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)-2)+(y+1);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)+2)+(y-1);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)-2)+(y-1);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)-1)+(y-2);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)-1)+(y+2);	
			checkBreakLimits(pos,player,allowedMoves);
			
			pos = String.fromCharCode(x.charCodeAt(0)+1)+(y-2);	
			checkBreakLimits(pos,player,allowedMoves);
		}
		
		if(piece === "B" || piece === "Q"){
			for(let i = 1 ; i <= 8 ;i++){
				let pos = String.fromCharCode(x.charCodeAt(0)+i)+(y+i);
				if (checkBreakLimits(pos,player,allowedMoves))break;	
				
			}	
			for(let i = 1 ; i <= 8 ;i++){
				let pos = String.fromCharCode(x.charCodeAt(0)+i)+(y-i);
				if (checkBreakLimits(pos,player,allowedMoves))break;	
			}	
			for(let i = 1 ; i <= 8 ;i++){
				let pos = String.fromCharCode(x.charCodeAt(0)-i)+(y+i);
				if (checkBreakLimits(pos,player,allowedMoves))break;	
			}
			for(let i = 1 ; i <= 8 ;i++){
				let pos = String.fromCharCode(x.charCodeAt(0)-i)+(y-i);
				if (checkBreakLimits(pos,player,allowedMoves))break;	
			}	
		
		}
		
		if(piece === "K"){		
			//move straigts
			let pos = String.fromCharCode(x.charCodeAt(0)+1)+y;			
			checkBreakLimits(pos,player,allowedMoves);			
			pos = String.fromCharCode(x.charCodeAt(0)-1)+y;
			checkBreakLimits(pos,player,allowedMoves);			
			pos = x+(y+1);
			checkBreakLimits(pos,player,allowedMoves);			
			pos = x+(y-1);
			checkBreakLimits(pos,player,allowedMoves);
			
			//move diagonal
			pos = String.fromCharCode(x.charCodeAt(0)+1)+(y+1);
			checkBreakLimits(pos,player,allowedMoves);
			pos = String.fromCharCode(x.charCodeAt(0)-1)+(y+1);
			checkBreakLimits(pos,player,allowedMoves);
			pos = String.fromCharCode(x.charCodeAt(0)+1)+(y-1);
			checkBreakLimits(pos,player,allowedMoves);	
			pos = String.fromCharCode(x.charCodeAt(0)-1)+(y-1);
			checkBreakLimits(pos,player,allowedMoves);				
		}

		//Eliminer les cases hors map 
		allowedMoves = allowedMoves.filter(position => document.getElementById(position) );
		
		//Notifier aucun move possible
		if(allowedMoves.length===0){
			//message("No possible moves.");
			return;
		}
		
		// Mettre un point sur chaque case autorisée
		allowedMoves.forEach(function(position){
			var target = document.getElementById(position);
			
			if(!hcMode){
				target.classList.add("highlight");
			}
			
		});	
		
		//message(allowedMoves.join(' '));
	};
	
	var checkBreakLimits = function(pos,player,allowedMoves){
		var elem = document.getElementById(pos);
		//Si on sort du plateau on s'arrete
		if(!elem )return true;
		//Si la case est vide on peut bouger
		if(!elem.hasChildNodes()){
			allowedMoves.push(pos);	
		}
		//si c'est une piece adverse on peut y aller et pas plus loin
		else if (elem.firstChild.getAttribute("player") !== player){
			allowedMoves.push(pos);return true;
		}
		//si c'est une pièce à soi on ne peut aller plus loin
		else{
			return true;
		}
	};
	
	_self.updateBoard  = function(source,target){
		var srcElem = document.getElementById(source);
		var targetElem = document.getElementById(target).innerHTML;
		document.getElementById(target).innerHTML = srcElem.innerHTML;
		srcElem.innerHTML = "";
		//as board is updated by the opponent, need to update local score information
		var playerIndex = players.indexOf($.chat.myNick());
		if(playerIndex > -1){			
			//update score from the opponent player move
			pointsEarnedFromMove(targetElem,players[1-playerIndex]);
		}
		
		
	};

	var handleDragStart = function(e) {
	  // Target (this) element is the source node.
	  //check if we move our piece
		console.log("current player " + currentPlayer);
		if(e.target.hasChildNodes() && e.target.firstChild.getAttribute("player")=== currentPlayer){
		  dragSrcEl = e.target;

		  e.dataTransfer.effectAllowed = 'move';
		  e.dataTransfer.setData('text/html', e.target.innerHTML);
		  e.dataTransfer.setData('origin', e.target.id);
		  
		  highlightAllowedMoves(dragSrcEl.firstElementChild.getAttribute("piece"),dragSrcEl.id,dragSrcEl.firstElementChild.getAttribute("player"))

		}

	};

	var handleDragEnter = function(e) {
	  // this / e.target is the current hover target.
	  e.target.classList.add('over');
	};

	var handleDragLeave = function(e) {
	  e.target.classList.remove('over');  // this / e.target is previous target element.
	  e.target.classList.remove('highlight');
	};

	var handleDragOver = function(e) {
	  if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	  }

	  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

	  return false;
	};
	
	var handleDragLeave = function(e) {
	  e.target.classList.remove('over');  // this / e.target is previous target element.
	};

	var handleDrop = function(e) {
	  // this/e.target is current target element.

	  if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	  }

	  // Don't do anything if dropping the same column we're dragging. 
	  // Don't allow droping if the position is not in one of the allowed moves
	  if (dragSrcEl != e.target && allowedMoves.includes(e.target.id)) {
	  
		// Set the source column's HTML to empty
		dragSrcEl.innerHTML = "";
		//replace content of the cell we are droping on
		
		//TODO remplacer le pion par une dame si il est tout en haut ou tout en bas du plateau
		var content = e.dataTransfer.getData('text/html');
		e.target.innerHTML = content;
		turnCount++;
		//Calculate points and display score
		pointsEarnedFromMove(content,$.chat.myNick());
		currentPlayer = "wait";
		
		//send board state to others in chat
		console.log('send => °chessgame state '+e.dataTransfer.getData('origin')+e.target.id);
		$.chat.send('°chessgame state '+e.dataTransfer.getData('origin')+e.target.id);
		
	  }

	  return false;
	};

	var handleDragEnd = function(e) {
	  // this/e.target is the source node.

	  [].forEach.call(cols, function (col) {
		col.classList.remove('over');
		col.classList.remove('highlight');
	  });
	};


};



var chessPluginVar = new chessPlugin();
$.chat.generateBoard = chessPluginVar.generateBoard;

$.plugin({
    name: 'chess',
    init: chessPluginVar.init,
	onWrite: chessPluginVar.onWrite,
    stop: chessPluginVar.stop
});

})();
