var egg;//알 이미지
var background;//배경
var music;//음악
var score;//점수

$(document).ready(function(){

    read_setting();
    load_setting();

    $(".setting_element").each(function(){
        var container = $(this);
        var img = container.find("img");
        var explain = container.find(".explain");
        var score_p = explain.find("p");
        var require_score = score_p.attr("class");

        if(score>=Number(require_score)){
            img.removeClass("hidden");
            explain.css("color", "black");
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

        if(setting.attr("id")=="setting_egg") index=Number(egg.slice(egg.length-5,egg.length-4));
        else if(setting.attr("id")=="setting_background") index=Number(background.slice(background.length-5,background.length-4));
        else if(setting.attr("id")=="setting_music") index=Number(music.slice(music.length-5,music.length-4));

        index=index-1;

        var imgs = setting.find("img");
        var current_img = imgs.eq(index);
        var explain = setting.find(".explain");
        var current_text = explain.eq(index);

        current_img.removeClass("alt");
        current_img.addClass("selected");
        current_text.removeClass("alt");
        current_text.addClass("selceted");


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

            load_setting(setting);
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

            load_setting(setting);
        });
    });

    $("#save_button").click(save_setting);
});

//환경 변수 읽기
function read_setting(){
    egg=getCookie("egg");
    background = getCookie("background");
    music = getCookie("music");
    score = getCookie("maxscore");
    if(egg==null){
        egg="img/egg1.png";
    }
    if(background==null){
        background="img/background1.png";
    }
    if(music==null){
        music="music/music1.mp3";
    }
    if(score==null){
        score=0;
    }
}

function load_setting(obj){
    //점수 설정
    var score_text=$("#score p");
    score_text.text("최고점수 : "+score+"점");

    if(obj==null){
        var current_background=$("#background");
        var background_text = background;
        current_background.css("background-image", "url("+background_text+")");

        var current_music=$("#music audio");
        var music_text = music;
        current_music.attr("src", "music"+music_text.slice(6,music_text.length-3)+"mp3");
    }else if(obj.attr("id")=="setting_background"){
        //배경 실시간 설정
    var current_background=$("#background");
    var background_text = $("#setting_background .selected").attr("src");
    current_background.css("background-image", "url("+background_text+")");
    }else if(obj.attr("id")=="setting_music"){
        
    //음악 실시간 설정
    var current_music=$("#music audio");
    var music_text = $("#setting_music .selected").attr("src");
    current_music.attr("src", "music"+music_text.slice(6,music_text.length-3)+"mp3");
    }
}

//setting의 역순
function save_setting(){
    //조건문으로 점수 몇점 머시기 해서 넣기
    var setting = $(".setting");
    var current_setting = $(".selected").parent();
    var text = current_setting.find("p");
    //모든 조건을 충족하는지 여부
    var isTrue = true;
    //필요한 점수
    var require_score;

    for(var i=0; i<setting.length; i++){
        require_score = Number(text.eq(i).attr("class"));

        if(require_score>score){
            false_setting=current_setting.eq(i);
            isTrue=false;
            break;
        }
    }

    if(isTrue){
        var hiddenImgSrcs = $("div .selected").map(function() {
            return $(this).attr("src");
        }).get();
        var audiosrc = $('audio').attr("src");
        setCookie("egg", hiddenImgSrcs[0], 1); // expires in 7 days
        setCookie("background", hiddenImgSrcs[1], 1); // expires in 7 days
        setCookie("music", audiosrc, 1); // expires in 7 days
        window.location.href = "start.html";
        console.log(hiddenImgSrcs);
    }else{
        alert("점수가 "+require_score+"점을 넘어야합니다.");
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