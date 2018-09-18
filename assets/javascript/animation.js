$(document).ready(function() {

    var positionX = 0;
    var positionY = 0;
    var frame = 0

    // $("#title").on("click", function() {
    //     frame--;
    //     positionX = positionX - 72;    
    //         // $("#stills-victory").css("width", width+"px");
            
    //     $("#stills-victory").css("background-position", "-"+positionX+"px -"+positionY+"px");
    //     $("#title").text(frame +" "+ positionX +" "+ positionY);
    // })

    
var stills = {victory: function(){
        // var width = 100;
        const interval = 100;
        // frame++;
        var tID=setInterval(function(){    
            // $("#stills-victory").css("width", width+"px");
        if (positionX !== 32) {
            positionX = positionX + 8;
        } else {
            positionX = 0;
            // stopAnimate(tID);
        }
        $("#stills-victory").css("background-position", "-"+positionX+"vw 0px");
    }, interval);}
    // }

}
$("#stills-victory").on("click", stills.victory)

})
