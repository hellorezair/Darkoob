// before game
var count_number = 4; // counting number
var count_time; // interval for counting number
// all games
var game_mode = "Simple"; // game mode
var game_time; // interval for 60 second game
var dead = 0; // number of time to finish and show record
var random_position = []; // save user windows width and height in array for box position
var userwidth = $(window).width(); // user windows width
var userheight = $(window).height(); // user windows height
var record = 0; // user record
// speed challenge
var speed_time; // interval for speedchallenge
var speed_level; // speedchallenge level

// print final user record
function final(){
    $(".game").addClass('hidden');
    $(".show-result").html('Done!<br>Your record in '+game_mode+' is : '+record+'<br><button class="result-ok">Ok</button>');
    // to do : make all div visible for next play game without refresh
}

// doing 60 second game dead
function do_dead(){
    game_time = setInterval(function(){
        if(dead<60){
            dead = dead+1;
            $(".time-till-now").text("Time : "+dead);
        }
        else{
            clearInterval(game_time);
            clearInterval(speed_time);
            $(".box").remove();
            final();
        }
    },1000);
}

// game functions
function simple(){
        random_position[0] = Math.floor((Math.random() * (userwidth-70)) + 0);
        random_position[1] = Math.floor((Math.random() * (userheight-70)) + 0);
        // debug alert(random_position[0]+',,,,'+random_position[1]);
        $(".box").remove();
        $(".game").append('<div class="box" id="box" style="right:'+random_position[0]+'px;top:'+random_position[1]+'px;"></div>');
}
function speed_challenge(hot){
    if(hot=="easy") speed_level = 1000;
    if(hot=="medium") speed_level = 800;
    if(hot=="hard") speed_level = 600;
    speed_time = setInterval(function(){
        random_position[0] = Math.floor((Math.random() * (userwidth-70)) + 0);
        random_position[1] = Math.floor((Math.random() * (userheight-70)) + 0);
        // debug alert(random_position[0]+',,,,'+random_position[1]);
        $(".box").remove();
        $(".game").append('<div class="box" id="box" style="right:'+random_position[0]+'px;top:'+random_position[1]+'px;"></div>');
    },speed_level);
}
function move_challenge(hot){
    clearInterval(game_time);
    alert("it's disable for now");
    final();
}

// calling game functions based on game mode
function game(){
    do_dead();
    switch(game_mode){
        case "Simple":
            simple();
            break;
        case "Speed Challenge - easy":
            speed_challenge("easy");
            break;
        case "Speed Challenge - medium":
            speed_challenge("medium");
            break;
        case "Speed Challenge - hard":
            speed_challenge("hard");
            break;
        case "Move Challenge - easy":
            move_challenge("easy");
            break;
        case "Move Challenge - medium":
            move_challenge("medium");
            break;
        case "Move Challenge - hard":
            move_challenge("hard");
            break;
        default:
            simple();
    }
}

// Counting from 1 to 3 and ready and go!
function do_count(){
    count_number = count_number-1;
    if(count_number<4 && count_number>0){
        $(".cc").text(count_number);
    }
    else if(count_number==0){
        $(".cc").text("Ready?");
    }
    else if(count_number==-1){
        $(".cc").text("Go!");
    }
    else{
        clearInterval(count_time);
        $(".count").addClass('hidden');
        game();
    }
}

$(document).ready(function(){

    // handling click events on game modes
    $(document).on('click','#play',function(){
        game_mode = $(".game-modes-select").val();
        $(".main").addClass('hidden');
        count_time = setInterval(do_count,1000);
    });
    
    // handling click events on help
    $(document).on('click','#help',function(){
        $(".help").addClass("show-help");
    });
    $(document).on('click','#gotit',function(){
        $(".help").removeClass("show-help");
    });
    
    // handling click events on boxes or not boxes
    $(document).on('click','.game',function(e){
        if(e.target == this){
            clearInterval(game_time);
            clearInterval(speed_time);
            $(".box").remove();
            final();
        }
    });
    $(document).on('click','.box',function(){
        record = record+1;
        $(".record-till-now").text("Record : "+record);
        switch(game_mode){
            case "Simple":
                simple();
                break;
            case "Speed Challenge - easy":
                $(".box").remove();
                break;
            case "Speed Challenge - medium":
                $(".box").remove();
                break;
            case "Speed Challenge - hard":
                $(".box").remove();
                break;
            case "Move Challenge - easy":
                move_challenge("easy");
                break;
            case "Move Challenge - medium":
                move_challenge("medium");
                break;
            case "Move Challenge - hard":
                move_challenge("hard");
                break;
        }
    });
    
    // handling result-ok button when showing results , it will reset all game functions and variables
    $(document).on('click','.result-ok',function(){
        count_number = 4;
        game_mode = "Simple";
        random_position = [];
        userwidth = $(window).width();
        userheight = $(window).height();
        record = 0;
        dead = 0;
        $(".cc").text("");
        $(".show-result").html("");
        $(".record-till-now").text("Record : 0");
        $(".time-till-now").text("Time : 0");
        $(".main,.game,.count").removeClass('hidden');
    });

});
