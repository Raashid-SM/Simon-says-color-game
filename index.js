var array_list =["green", "red", "yellow", "blue"];
var sequence = [];
var clicked_pattern =[];
var started =false;


$(document).on("keydown",function(){
    if(!started) {
        nextSequence();
        started =true;
    } 
});

$(".btn").on("click", function(event){
    var clicked_color = this.id;
    clicked_pattern.push(clicked_color);
    var clickaud = new Audio("sounds/" + clicked_color+".mp3");
    clickaud.play();
    $("."+clicked_color).addClass("pressed");

    setTimeout(function() {
        $("."+clicked_color).removeClass("pressed");       
    },100);
    checkAnswer(clicked_pattern.length-1);
});
    


function nextSequence() {
    clicked_pattern=[];
    var random_number = Math.floor(Math.random()*4);
    var chosen_color = array_list[random_number];
    sequence.push(chosen_color);
    var seqaud = new Audio("sounds/"+chosen_color+".mp3");
    $("h2").html("Level " + sequence.length);
    setTimeout(function() {
        $("#"+chosen_color).fadeOut();
        $("#"+chosen_color).fadeIn();  
        seqaud.play();
    },100);
}

function checkAnswer(currentLevel){
    if(clicked_pattern[currentLevel]==sequence[currentLevel]){
        if(clicked_pattern.length == sequence.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else{
        $("h2").html("Game Over, press any key to restart");
        $("body").addClass("game-over");
        var aud1 = new Audio("sounds/wrong.mp3");
        aud1.play();
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startover();
    }
}

function startover(){
sequence = [];
clicked_pattern =[];
started =false;
}