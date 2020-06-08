var gifsPlugin = function () {
    var _self = this;
    var selectURL;
    var limit;
    var offset;
    var keywords;
    var user;
    _self.init = function () {
        $.pluginApi.loadPlugin("IRCcmd");
        $.irc.addCmd(
            {
                func: _self.gifs,
                description: "Select a gif related to keyword(s)",
                proto: "/gifs [keyword(s)]",
            },
            "gifs"
        );
    };
    _self.stop = function () {
        $.irc.addCmd(null, "gifs");
    };
    _self.gifs = function (cmd, params, source) {
        user = source || $.chat.myNick();
        keywords = encodeURIComponent(params);
        loadGifs();
        return "";
    };
    function loadGifs() {
        offset = 0;
        limit = 5;
        $("textarea").after(
            "<div id='gifSelector'><ul id='gifcontainer' style='list-style-type: none;display:inline-flex'></ul><ul id='gifMenu' style='list-style-type: none;'><li><button type='button' role='button' onclick='$.chat.gifPluginVar.reload()'>Load More...</button><button type='button' role='button' onclick='$.chat.gifPluginVar.cancel()'>Cancel</button></li></ul></div>"
        );
        buildURL();
    }
    function buildURL() {
        selectURL =
            "https://api.giphy.com/v1/gifs/search?q=" +
            keywords +
            "&api_key=dc6zaTOxFJmzC&limit=" +
            limit +
            "&offset=" +
            offset;
        $.ajax({
            dataType: "json",
            url: selectURL,
            type: "GET",
            success: function (response) {
                offset = offset + limit;
                for (var i = 0; i < response.data.length; i++) {
                    var gifUrl = response.data[i].images.fixed_height_small.url;
                    $("#gifcontainer").append(
                        "<li><div style='border-left: #cbd8df thick solid'><img src=" +
                            gifUrl +
                            " title='Powered By Néné' alt='Error'/></div><button type='button' onclick='$.chat.gifPluginVar.send(\"" +
                            gifUrl +
                            "\")'>Send</div></li>"
                    );
                }
            },
            error: function (response) {
                console.log(response);
            },
        });
    }
    _self.send = function (url) {
        $("#gifSelector").remove();
        var finalMessage =
            "<img src=" + url + " title='Powered By NÃ©nÃ©' alt='Error'/> ";
        $.chat.send(finalMessage);
    };
    _self.reload = function () {
        $("#gifcontainer").html("");
        buildURL();
    };
    _self.cancel = function () {
        $("#gifSelector").remove();
    };
};
$.chat.gifPluginVar = new gifsPlugin();
$.plugin({ name: "gifs", init: $.chat.gifPluginVar.init, stop: $.chat.gifPluginVar.stop });
