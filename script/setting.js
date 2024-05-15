$(document).ready(function(){
    $(".left").click(function(){
        var img = $(this).prev().children();
        leftbutton(img);
    });

    $(".right").click(function(){
        var img = $(this).prev().prev().children();
        rightbutton(img);
    });
});

function leftbutton(obj){
    var index;
    var Array;
    var attrid = obj.attr("id");

    //함수로 바꿀 수 있을까?
    if(attrid=="egg_img"){
        index=egg_index;
        Array=egg_Array;
    }else if(attrid=="background_img"){
        index=background_index;
        Array=background_Array;
    }else if(attrid=="music_img"){
        index=music_index;
        Array=music_Array;
    }

    if(index==0) index=Array.length;
    index=(index-1)%Array.length;
    obj.attr("src", "./img/"+Array[index]);

    if(attrid=="egg_img")egg_index=index;
    else if(attrid=="background_img")background_index=index;
    else if(attrid=="music_img")music_index=index
}

function rightbutton(obj){
    var index;
    var Array;
    var attrid = obj.attr("id");

    //함수로 바꿀 수 있을까?
    if(attrid=="egg_img"){
        index=egg_index;
        Array=egg_Array;
    }else if(attrid=="background_img"){
        index=background_index;
        Array=background_Array;
    }else if(attrid=="music_img"){
        index=music_index;
        Array=music_Array;
    }

    index=(index+1)%Array.length;
    obj.attr("src", "./img/"+Array[index]);

    if(attrid=="egg_img")egg_index=index;
    else if(attrid=="background_img")background_index=index;
    else if(attrid=="music_img")music_index=index
}

var egg_index = 0;
var background_index = 0;
var music_index = 0;
var egg_Array = ["eggimg1.webp","eggimg2.webp","eggimg3.webp","eggimg4.webp","eggimg5.webp"];
var background_Array=["scene1.webp","scene2.webp","scene3.webp","scene4.webp","scene5.webp",];
var music_Array=["music1.webp","music2.webp","music3.webp","music4.webp","music5.webp",];