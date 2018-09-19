$(document).ready(function() {

    var positionX = 0;
    var positionY = 0;
    var frame = 0

    // $("#title").on("click", function() {
    //     frame--;
    //     positionX = positionX - 72;    
    //         // $("#ramona-damaged").css("width", width+"px");
            
    //     $("#ramona-damaged").css("background-position", "-"+positionX+"px -"+positionY+"px");
    //     $("#title").text(frame +" "+ positionX +" "+ positionY);
    // })

    
var ramona = {damaged: function(){
        // var width = 100;
        const interval = 100;
        // frame++;
        var tID=setInterval(function(){    
            // $("#ramona-damaged").css("width", width+"px");
        if (positionX < 220) {
            positionX = positionX + 18;
            console.log(positionX)
        } else {
            // positionX = 0;
            // stopAnimate(tID);
        }
        $("#ramona-damaged").css("background-position", "-"+positionX+"vw 0px");
    }, interval);}
    // }

}
$("#ramona-damaged").on("click", ramona.damaged)

})
