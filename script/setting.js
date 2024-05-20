var egg;//알 이미지
var background;//배경
var music;//음악
var score;//점수
var background_Array = ["background.png", "background2.png", "background3.png"];
var background_index = 0;

$(document).ready(function(){
    var backgroundCookie = getCookie("background");
    if (backgroundCookie) {
        background_index = background_Array.indexOf(backgroundCookie);
        if (background_index === -1) background_index = 0;
    }
    $('#background').css('background-image', 'url(../img/'+background_Array[background_index]+')');

    read_setting();

    $(".setting_element").each(function(){
        var container = $(this);
        var img = container.find("img");
        var explain = container.find(".explain");
        var score_p = explain.find("p");
        var require_score = score_p.attr("class");
        console.log(require_score);


        if(score>=Number(require_score)){
            img.removeClass("hidden");
            score_p.text("사용 가능");
        }else{
            score_p.text(require_score+"점 이상");
        }
    });

    $(".setting").each(function(){
        var setting = $(this);
        var left = setting.find(".left");
        var right = setting.find(".right");
        var index=0;

        left.click(function(){
            var imgs = setting.find("img");
            var current_img = imgs.eq(index);
            var explain = setting.find(".explain");
            var current_text = explain.eq(index);

            index-=1;
            index = index<0 ? imgs.length-1 : index; 
            
            var prev_img = imgs.eq(index);
            current_img.addClass("alt");
            prev_img.removeClass("alt");
            prev_img.addClass("selected");
            current_img.removeClass("selected")

            var prev_text = explain.eq(index);
            current_text.addClass("alt");
            prev_text.removeClass("alt");

        });
        
        right.click(function(){
            var imgs = setting.find("img");
            var current_img = imgs.eq(index);
            var explain = setting.find(".explain");
            var current_text = explain.eq(index);

            index+=1;
            index = index>imgs.length-1 ? 0 : index; 
            
            var prev_img = imgs.eq(index);
            current_img.addClass("alt");
            prev_img.removeClass("alt");
            prev_img.addClass("selected");
            current_img.removeClass("selected")

            var prev_text = explain.eq(index);
            current_text.addClass("alt");
            prev_text.removeClass("alt");
        });
    });

    $("#save_button").click(save_setting);
});

//환경 변수 읽기
function read_setting(){
    egg;
    background = $("#background");
    music = $("#music");
    score=0;
}

//setting의 역순
function save_setting(){
    //조건문으로 점수 몇점 머시기 해서 넣기
    var setting = $(".setting");
    var isTrue = true;

    console.log("테스트");

    for(var i=0; i<setting.length; i++){
        var require_score = Number(setting.eq(i).find("p").attr("class"));

        if(require_score>score){
            isTrue=false;
            console.log("테스트");
        }
    }

    if(isTrue){
        var hiddenImgSrcs = $("div .selected").map(function() {
            return $(this).attr("src");
        }).get();
        setCookie("egg", hiddenImgSrcs[0], 1); // expires in 7 days
        setCookie("background", hiddenImgSrcs[1], 1); // expires in 7 days
        setCookie("music", hiddenImgSrcs[2], 1); // expires in 7 days
        window.location.href = "start.html";
        console.log(hiddenImgSrcs);
    }else{
        alert("점수가 %d점 넘어야합니다.");
    }
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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