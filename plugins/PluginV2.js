$.plugin({
    name: "PluginV2",
    init: function () {
        $.chat.send("New plugin management is ready, prefer using the new command 'execpluginv2 commit [public|private] [pluginname] [plugincode]' over '/plugin add'.\n" +
            "It is now possible to commit to a private repository. Prefer the private repository for sensitive plugins.");
    },
    onSend: function (message) {
        const commitCommand = "execpluginv2 commit";
        const publicCommand = commitCommand + " public ";
        const privateCommand = commitCommand + " private ";
        if (message.startsWith(publicCommand) || message.startsWith(privateCommand)) {
            const isPrivate = message.startsWith(privateCommand);
            const nameAndContent = message.substring(isPrivate ? privateCommand.length : publicCommand.length);
            const name = nameAndContent.substring(0, nameAndContent.indexOf(" "));
            const content = nameAndContent.substring(name.length + 1);

            try {
                $.ajax({
                    type: 'POST',
                    data: content,
                    contentType: 'application/javascript',
                    url: 'https://nktpluginscommit.azurewebsites.net/api/commit?name=' + name + '&isPrivate=' + isPrivate,
                    success: function (data) {
                        $('<iframe src="/PluginManager.js" />').css('display', 'none').appendTo($('body')).on('load', function () {
                            $.chat.send('<script>' + content + '</script>');
                            const repositoryName = isPrivate ? 'private' : 'public';
                            $.chat.send('/me commited a valid plugin ' + name + ' to the ' + repositoryName + ' repository, a bot will apply the changes soon.');
                        });
                    },
                    error: function (xhr) {
                        $('<iframe src="/PluginManager.js" />').css('display', 'none').appendTo($('body')).on('load', function () {
                            $.chat.send('You have an invalid commit, here are the errors: ' + xhr.responseText);
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