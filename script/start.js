var popup = 0
var animatetime = 750;

$(function(){
    $("#go-game").on("click", function(){
        $("#game-selector").show(animatetime);
        popup = 1;
    });

    $("#close-button")
    .on("click", function(){
        if(popup == 1){
            $("#game-selector").hide(animatetime);
            popup = 0;
        }
    })
    .on("mouseover", function(){
        $(this).css("cursor", "pointer");
    })

});