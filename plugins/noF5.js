$.plugin({
    name: 'noF5',
    init: function() { $.chat.noF5=function(e) { if ((e.which || e.keyCode) == 116) e.preventDefault(); };$(document).on("keydown", $.chat.noF5);},
    stop: function() { $(document).off("keydown", $.chat.noF5);}
});