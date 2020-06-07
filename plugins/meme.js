

var memePlugin = function () { 
  var _self = this;

        _self.init = function () {
            $.pluginApi.loadPlugin('IRCcmd');
            $.irc.addCmd({ 
                func: _self.meme, 
                description:'Display a meme builder.', 
                proto:'/meme'
            }, 'meme');
	var style = document.createElement('style');
	style.innerHTML = ''
     +'.meme {'
     +'    background-size: 100%; '
     +'    text-align: center;'
     +'    position: relative;'
     +'}'
     +'.memeCaption{'
     +'    position: absolute; '
     +'    left: 0;'
     +'    right: 0;' 
     +'    margin: 15px 0;'
     +'    padding: 0 5px;'
     +'    font-family: impact;'
     +'    font-size: 2.5em;'
     +'    text-transform: uppercase;'
     +'    color: white;'
     +'    letter-spacing: 1px;'
     +'    text-shadow:2px 2px 0 #000,'
     +'                -2px -2px 0 #000,'
     +'                2px -2px 0 #000,'
     +'                -2px 2px 0 #000,'
     +'                0px 2px 0 #000,'
     +'                2px 0px 0 #000,'
     +'                0px -2px 0 #000,'
     +'                -2px 0px 0 #000,'
     +'                2px 2px 5px #000;'
     +'}'
     +'.bottom {'
     +'    bottom: 0;'
     +'}'
     +'.top {'
     +'    top: 0;'
     +'}';
	document.body.appendChild(style);
        } ;
    
        _self.stop = function() {
            $.irc.addCmd(null, 'meme');
        };


        _self.meme = function (cmd, params, source) {
          user=source || $.chat.myNick(); 

 
          loadBuilder();
return '';

        };
        
        function loadBuilder() { 

var strVar="";
strVar += "";
strVar += "<div id=\"memeBuilder\" class=\"panel\">";
strVar += "    <div>";
strVar += "        <span>Image Url</span>";
strVar += "        <input id=\"imgUrl\" type=\"text\" />";
strVar += "    </div>";
strVar += "";
strVar += "    <div>";
strVar += "        <span>Caption Top</span>";
strVar += "        <input id=\"captionTop\" type=\"text\" />";
strVar += "    </div>";
strVar += "";
strVar += "    <div>";
strVar += "        <span>Caption Bot</span>";
strVar += "        <input id=\"captionBot\" type=\"text\" />";
strVar += "    </div>";
strVar += "<div id=\"memeContainer\">";
strVar += "<div id=\"meme\" class='meme' style=\"overflow:hidden;\">";
strVar += "<img id=\"memeImage\" style=\"float:left\" />";
strVar += "<p id=\"topDemo\" class='memeCaption top'  style=\"top:0\"></p>";
strVar += "<p id=\"bottomDemo\" class='memeCaption bottom' style=\"bottom:0\"></p>";
strVar += "</div>";
strVar += "</div>";
strVar += "    <div>";
strVar += "        <button role=\"button\" onclick=\"memePluginVar.send()\">Done</button>";
strVar += "        <button role=\"button\" onclick=\"memePluginVar.cancel()\">Cancel</button>";
strVar += "    </div>";
strVar += "</div>";

  $('textarea').after(strVar);
 
  $("#captionTop").on("input", function () {

$('#topDemo').text($("#captionTop").val());



});

$("#captionBot").on("input", function () {

$('#bottomDemo').text($("#captionBot").val());

});

   $('#memeImage').load(function () {
        $('#meme').css('width', $('#memeImage').width());
    });

    $("#imgUrl").on("input", function () {

 
        $('#memeImage').attr("src", $("#imgUrl").val())
        

    });
        }

       

        _self.send = function(url) {

          
            var finalMessage = $("#memeContainer").html();
            $.chat.send(finalMessage);
           $('#memeBuilder').remove();
         
        };

        _self.cancel = function() {
            $('#memeBuilder').remove();
        };


    }


    var memePluginVar = new memePlugin();

    $.plugin({
        name: 'meme',
        init: memePluginVar.init,
        stop: memePluginVar.stop
    });