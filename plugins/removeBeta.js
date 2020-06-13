$.plugin({
	name: 'removeBeta',
    
    init: function() {
        $('.plugins span:first').hide();
        $('#plugins-toggle').css('margin-top', -5);
        if ($.chat.chatObserver) $.chat.chatObserver.disconnect();
        $.chat.fndaousort = () => {
            $.chat.chatObserver.disconnect();
            $("#plugin-container div").sort(function(a, b) {
              return ('' + a.id).localeCompare(b.id);;
            }).each(function() {
              var elem = $(this);
              elem.remove();
              $(elem).find('a').attr(
                  'href',
                  (($.chat.privatePlugins
                  && $.chat.privatePlugins.indexOf($(this).attr('id')) > -1)
                  ? 'https://github.com/fabienDaou/Nkt-plugins-private/blob/master/plugins/'+ $(this).attr('id') +'.js'
                  : 'https://github.com/fabienDaou/Nkt-plugins/blob/master/plugins/'+ $(this).attr('id') +'.js')
                );
              $(elem).appendTo("#plugin-container");
            });
             $.chat.chatObserver.observe(document.getElementById('plugin-container'), {
                childList: true
            });
        }
        $.chat.chatObserver = new MutationObserver(function (mutations) {
            mutations.forEach(({ addedNodes }) => {
                if (addedNodes !== null) {
                    clearTimeout($.chat.timerdaousort);
                    $.chat.timerdaousort=setTimeout($.chat.fndaousort, 100);
                }
            });
        });
        $.chat.chatObserver.observe(document.getElementById('plugin-container'), {
            childList: true
        });
        setTimeout($.chat.fndaousort, 100);

        const useNktFavicon = () => {
            const head = document.querySelector("head");
            const faviconLink = document.createElement("link");
            faviconLink.setAttribute("rel", "shortcut icon");
            faviconLink.setAttribute("href", "https://raw.githubusercontent.com/fabienDaou/fabienDaou.github.io/master/icons/favicon.ico");
            head.appendChild(faviconLink);
        };
        useNktFavicon();
    }
});