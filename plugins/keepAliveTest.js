$.plugin({
    
    name: 'keepAliveTest',
	init: function() {
		$('<audio src="https://streaming.radionomy.com/EnchantedRadio" type="audio/mpeg" controls="true" autoplay="true" onloadstart="this.volume=0.0"></audio>').appendTo($('body'));
    }, stop: function() {$('audio:last').remove();}
});