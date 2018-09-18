$(document).ready(function() {

    var positionX = 0;
    var positionY = 0;
    var frame = 0

    // $("#title").on("click", function() {
    //     frame--;    
            // $("#matthew-idle").css("width", width+"px");
            
    //     $("#matthew-idle").css("background-position", "-"+positionX+"px -"+positionY+"px");
    //     $("#title").text(frame +" "+ positionX +" "+ positionY);
    // })

    
var matthew = {idle: function(){
        // var width = 100;
        const interval = 100;
        frame++;
        setInterval(function(){    
            // $("#matthew-idle").css("width", width+"px");
        if (positionX !== 40) {
            positionX = positionX + 8;
        } else {
            positionX = 0;
        }
        $("#matthew-idle").css("background-position", "-"+positionX+"vw 0px");
    }, interval);}
    // }

}
$("#matthew-idle").on("click", matthew.idle)

})
