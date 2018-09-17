$(document).ready(function() {

    var positionX = 0;
    var positionY = 0;
    var frame = 0

    // $("#title").on("click", function() {
    //     frame--;    
            // $("#kim-idle").css("width", width+"px");
            
    //     $("#kim-idle").css("background-position", "-"+positionX+"px -"+positionY+"px");
    //     $("#title").text(frame +" "+ positionX +" "+ positionY);
    // })

    
var kim = {idle: function(){
        // var width = 100;
        const interval = 100;
        frame++;
        setInterval(function(){    
            // $("#kim-idle").css("width", width+"px");
        if (positionX !== 15) {
            positionX = positionX + 5;
        } else {
            positionX = 0;
        }
        $("#kim-idle").css("background-position", "-"+positionX+"vw 0px");
    }, interval);}
    // }

}
$("#kim-idle").on("click", kim.idle)

})
