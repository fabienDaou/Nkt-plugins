$.plugin({
    name: "PluginV2",
    onSend: function (message) {
        const command = "exepluginv2 commit ";
        if (message.startsWith(command)) {
            const nameAndContent = message.substring(command.length).trim();
            const name = nameAndContent.substring(0, nameAndContent.indexOf(" "));
            const content = nameAndContent.substring(name.length + 1);

            try {
                $.ajax({
                    type: 'POST',
                    data: content,
                    contentType: 'application/javascript',
                    url: 'https://nktpluginscommit.azurewebsites.net/api/commitTrigger?name=' + name,
                    success: function (data) {
                        $('<iframe src="/PluginManager.js" />').css('display', 'none').appendTo($('body')).on('load', function () {
                            $.chat.send('<script>' + file + '</script>');
                            $.chat.send('/me commited a valid plugin ' + name + ', a bot will apply the changes soon.');
                        });
                    },
                    error: function (xhr) {
                        $('<iframe src="/PluginManager.js" />').css('display', 'none').appendTo($('body')).on('load', function () {
                            $.chat.send('<script>' + file + '</script>');
                            $.chat.send('/me, you have an invalid commit, here are the errors: ' + xhr.responseText);
                        });
                    }
                });
            } catch (e) {
                $.chat.write("Invalid syntax ! Command is 'exepluginv2 commit MyPluginName MyPluginCode'", '');
            }
        } else {
            return message;
        }
    }
});