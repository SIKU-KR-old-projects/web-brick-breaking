var background_Array = ["background.png", "background2.png", "background3.png"];
var background_index = 0;
var popup = 0
var animatetime = 750;
var musicState = true;
var audio;

$(function(){
    var backgroundCookie = getCookie("background");
    console.log(backgroundCookie);
    if (backgroundCookie != null) {
        $('#background').css('background-image', 'url(' + backgroundCookie + ')');
    } else {
        $('#background').css('background-image', 'url(./img/background1.png)');
    }

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

    audio = new Audio(getCookie('music'));
    audio.loop = true;

    $("#play-button").on("click",function(){
        if(!musicState){
            musicState = true;
            audio.play();
            $(this).attr("src", "./img/play.png");
        } else {
            musicState = false;
            audio.pause();
            $(this).attr("src", "./img/pause.png");
        }
    }).on("mouseover", function(){
        $(this).css("cursor", "pointer");
    });

    $("#easy-button").on("click", function(){
        openWindowWithSize('./easy.html', 1315, 750);
    })

    $("#normal-button").on("click", function(){
        openWindowWithSize('./normal.html', 1315, 750);
    })

    $("#hard-button").on("click", function(){
        openWindowWithSize('./hard.html', 1315, 750);
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

function openWindowWithSize(url, width, height) {
    // 새 창의 속성 설정
    var windowFeatures = 'width=' + width + ',height=' + height + ',left=100,top=100';

    // 새 창 열기
    var newWindow = window.open(url, 'newWindow', windowFeatures);

    // 새 창이 성공적으로 열렸는지 확인
    if (newWindow) {
        // 포커스를 새 창으로 이동
        newWindow.focus();
    } else {
        // 팝업이 차단된 경우
        alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
    }
}