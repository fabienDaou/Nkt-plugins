$.plugin({
    
    name: 'keepAlive',
	init: function() {
		$('<audio src="/files/null.mp3" controls autoplay loop></audio>').appendTo($('body'));
    }, stop: function() {$('audio:last').remove();}
});