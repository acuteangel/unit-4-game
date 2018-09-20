$(document).ready(function() {

    
    var positionY = 0;
    var frame = 0

    // $("#title").on("click", function() {
    //     frame--;
    //     positionX = positionX - 72;    
    //         // $("#envy-idle").css("width", width+"px");
            
    //     $("#envy-idle").css("background-position", "-"+positionX+"px -"+positionY+"px");
    //     $("#title").text(frame +" "+ positionX +" "+ positionY);
    // })

    
var envy = {idle: function(){
        // var width = 100;
        var positionX = 0;
        $("#envy-idle").css("background-position", "-"+positionX+"vw -"+positionY+"vw");
        const interval = 100;
        // frame++;
        var tID=setInterval(function(){    
            // $("#envy-idle").css("width", width+"px");
        if (positionX != 22.5) {            
            positionX = positionX+7.5;            
            
        } else {
            positionX = 0;
            // stopAnimate(tID);
        }
        $("#envy-idle").css("background-position", "-"+positionX+"vw -"+positionY+"vw");
    }, interval);}
    // }

}
$("#envy-idle").on("click", envy.idle())
var envy = {death: function(){
    // var width = 100;
    var positionX = 0;
    var positionY = 0
    const interval = 150;
    // frame++;
    var tID=setInterval(function(){    
        // $("#envy-death").css("width", width+"px");
        if (positionX != 99) {
            positionX = positionX +16.5;
        } else {                    
            if (positionY !=92.5) {
                positionY = positionY + 18.5;
                positionX = 0;
            } else {
                clearInterval(eDID);
            }                
        };
    $("#envy-death").css("background-position", "-"+positionX+"vw 0px");
}, interval);}
// }

}
$("#envy-death").on("click", envy.death())

})