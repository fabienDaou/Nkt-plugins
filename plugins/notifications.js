$.plugin({
    
    name: 'notifications',
	init: function() {
		Notification.requestPermission();
		$.chat.focusBoolNotif = true;
                $(window).focus(this.focus).blur(this.blur);
    },
	focus: function(){
		$(window).blur(this.blur);
		$.chat.focusBoolNotif = true;
	},
	blur: function(){
		$(window).focus(this.focus);
		$.chat.focusBoolNotif = false;
	},
    onWrite: function(msg, nick) {
		if(!$.chat.focusBoolNotif){
		  new Notification(nick+'> '+$(msg).text());
		}
		return msg;
    }
});