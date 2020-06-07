$.plugin({
            
    name: 'zebra',

	swit: true,
	
    onWrite: function(msg, nick) {
		this.swit = ! this.swit;
		if(this.swit)
			return '<span style="color:blue">'+msg+'</span>';
		else
			return '<span style="color:red">'+msg+'</span>';
	}
    
    
    
});