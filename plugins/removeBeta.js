$.plugin({
	name: 'removeBeta',
    
    init: function() {
        $('.plugins span:first').hide();
        $('#plugins-toggle').css('margin-top', -5);
        $.chat.fndaousort = () => {
            $.chat.chatObserver.disconnect();
            $("#plugin-container div").sort(function(a, b) {
              return ('' + a.id).localeCompare(b.id);;
            }).each(function() {
              var elem = $(this);
              elem.remove();
              $(elem).appendTo("#plugin-container");
            });
             $.chat.chatObserver.observe(document.getElementById('plugin-container'), {
                childList: true
            });
        }
        $.chat.chatObserver = new MutationObserver(function (mutations) {
            mutations.forEach(({ addedNodes }) => {
                if (addedNodes !== null) {
                    clearTimeout($.chat.timerdaousort);$.chat.timerdaousort=setTimeout($.chat.fndaousort, 100);
                }
            });
        });
        $.chat.chatObserver.observe(document.getElementById('plugin-container'), {
            childList: true
        });
        setTimeout($.chat.fndaousort, 100);
    }
});