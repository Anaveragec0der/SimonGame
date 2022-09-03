var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var started=false;
var level=0;
//("document").on() is an asynchronus function it adds listners to whole document so whenever the event
//triggers the next sequence function hence
/*
    if(started===false){
            $(document).on("keydown",function(event){
            $("#level-title").text("level "+level);
            nextSequence();
    });
        started=true;
    }
    will not work because despite there is the if condition still the event trigger will call the 
    nextSequence() function to prevent it from happening either we have to remove the listners from
    the the list of listners in the document OR we can use if condition before we are calling the next
    sequence functuion like it is done below 
    to check it console log anything just after the .on keyword and then youll see that the console log
    will happen despite the if condititon 
*/  


//if(started===false){
    $(document).on("keydown",function(){
        //console.log("hello") this will be logged onto the console even if we put the if condition 
        //outside the $("document").on
        if(started===false){
            $("#level-title").text("level "+level);
            nextSequence();
            started=true;
        }
        $("h2").text("");
    });
    //started=true;
//}
    // $(body).on("click",function(){
    //     if(started===false){
    //         nextSequence();
    //         started=true;
    //     }
    // })
    $("h2").on("click",function(){
        if(started===false){
            nextSequence();
            started=true;
        }
    })
    $("h1").on("click",function(){
        if(started===false){
            nextSequence();
            started=true;
        }
    })
$(".btn").on("click",function(){
    if(started===true){
        var userChoosenColor=$(this).attr("id");
        userClickedPattern.push(userChoosenColor);
        playSound(userChoosenColor);
        animatePress(userChoosenColor);
         var currentIndex=userClickedPattern.lastIndexOf(userChoosenColor);// what is happening here?
         /* every time next sequence is called the array userClickedPattern is set to empty now lets assume
         that the game pattern was [green blue yellow green] each user button click gets recorded in the 
         userClickedPattern lets assume user inputs [green blue yellow yellow] now last index of yellow 
         which is 3 is passed to the check answer function then in checkAnswer function if gamePattern[3]
         ie green matches userClickedPattern[3] ie yellow which is false hence the output is wrong*/
         checkAnswer(currentIndex);      
    }
});
function nextSequence() {
    $("h2").text(" ");
    userClickedPattern=[];
    var randomNumber;
    randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChoosenColor);
   level++;
   $("#level-title").text("level "+level);
}
function playSound(name){
    var audio =new Audio("sounds/"+name+".mp3");
    audio.play();
}
    
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed")
    },100);//milliseconds
}
function checkAnswer(currentLevel){
    var i;
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        var count=0;
        for(i=0;i<gamePattern.length;i++){
            if(gamePattern[i]==userClickedPattern[i]){
                count++;
            }
        }
        if(count ===gamePattern.length)
        {
            console.log("success")
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
        else{
            console.log("wrong");
            var wrongAudio= new Audio("sounds/wrong.mp3");
            wrongAudio.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            $("#level-title").text("Game over,Press any key to Restart");
            $("h2").addClass("h2design");
            $("h2").text("Or touch me ")
            startover();
        }
    
}
function startover(){
    level=0;
    gamePattern=[];
    started=false;
}