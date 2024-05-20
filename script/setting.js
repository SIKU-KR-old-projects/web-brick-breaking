var egg;//알 이미지
var background;//배경
var music;//음악
var score;//점수

$(document).ready(function(){
    read_setting();
    img_setting();

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

            var prev_text = explain.eq(index);
            current_text.addClass("alt");
            prev_text.removeClass("alt");
        });
    });

    $("#save_button").click(save_setting());
});

//환경 변수 읽기
function read_setting(){
    egg;
    background = $("#background");
    music = $("#music");
    score=150;
}

function img_setting(){
    $("#egg_img").attr("src",egg);
    //배경 이미지를 불러와서 사진 넣기
    $("#background_img").attr("src", background.css("background-image").slice(4,background.length-1));
    //음악 속성을 가져와서 이미지 속성 src와 잘 버무려주기
    $("#music_img").attr("src","./img/"+music.attr("src")+".png");
    $("#score p ").text("최고 점수 : "+score+"점");

    
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
        //egg.attr("src",egg);
        //배경 이미지를 불러와서 사진 넣기
        background.css("#background-image", "url(" + "#background_img".setting + ")");
        console.log(background.css("background-image"));
        //음악 속성을 가져와서 이미지 속성 src와 잘 버무려주기
        //music.attr("src","./img/"+music.attr("src")+".webp");
    }else{
        alert("점수가 %d점 넘어야합니다.");
    }
}