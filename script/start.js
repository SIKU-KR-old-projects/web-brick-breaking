var background_Array = ["background.png", "background2.png", "background3.png"];
var background_index = 0;

var popup = 0
var animatetime = 750;

$(function(){
    var backgroundCookie = getCookie("background");
    if (backgroundCookie) {
        background_index = background_Array.indexOf(backgroundCookie);
        if (background_index === -1) background_index = 0;
    }
    $('#background').css('background-image', 'url(../img/'+background_Array[background_index]+')');

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

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
