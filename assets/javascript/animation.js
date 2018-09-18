$(document).ready(function() {

    var positionX = 0;
    var positionY = 0;
    var frame = 0

    // $("#title").on("click", function() {
    //     frame--;
    //     positionX = positionX - 72;    
    //         // $("#matthew-damaged").css("width", width+"px");
            
    //     $("#matthew-damaged").css("background-position", "-"+positionX+"px -"+positionY+"px");
    //     $("#title").text(frame +" "+ positionX +" "+ positionY);
    // })

    
var matthew = {damaged: function(){
        // var width = 100;
        const interval = 100;
        // frame++;
        var tID=setInterval(function(){    
            // $("#matthew-damaged").css("width", width+"px");
        if (positionX !== 169) {
            positionX = positionX + 13;
        } else {
            positionX = 0;
            // stopAnimate(tID);
        }
        $("#matthew-damaged").css("background-position", "-"+positionX+"vw 0px");
    }, interval);}
    // }

}
$("#matthew-damaged").on("click", matthew.damaged)

})
