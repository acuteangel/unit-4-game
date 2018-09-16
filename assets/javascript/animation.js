$(document).ready(function() {

var positionX = 0;
var positionY = 0;
var frame = 0

$("#title").on("click", function() {
    frame--;    
        // $("#image").css("width", width+"px");
        
    $("#image").css("background-position", "-"+positionX+"px -"+positionY+"px");
    $("#title").text(frame +" "+ positionX +" "+ positionY);
})


$("#image").on("click", function animateScript() {    

    // var width = 100;
    const interval = 100;
    frame++;
    setInterval(function(){    
        // $("#image").css("width", width+"px");
    if (positionX !== 960) {
        positionX = positionX + 60;
    } else {
        // positionX = 0;
    }
    $("#image").css("background-position", "-"+positionX+"px -"+positionY+"px");
}, interval);
// }

})})
