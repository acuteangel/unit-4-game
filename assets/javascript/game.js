$(document).ready(function() {
    var scene = 0;
    var positionX = 0
    var playableCharacters = ["scott", "ramona", "stills", "kim"]
    var player = ""
    var scott = {
        hp: 151,
        basicAttack: "PUNCH",
        specialAttack: "FLURRY",
        attack1: function () {
    //     height: 100px;
    //     width: 60px;
    // background: url('../images/scott-attack1.png') 0px 0px; 
            const interval = 100;
            var sp1ID = setInterval(function(){                
                if (positionX <420) {
                    positionX = positionX + 60;
                } else {
                    stopAnimate(sp1ID);
                }
                $("#image").css("background-position", "-"+positionX+"px 0px");
            }, interval);
        },
    
        attack2: function () {        
    //     height: 61px;
    //     width: 60px;
    // background: url('../images/scott-attack2.png') 0px 0px; 
            const interval = 100;
            var s2ID = setInterval(function(){
                if (positionX !== 960) {
                    positionX = positionX + 60;
                } else {
                    stopAnimate(s2ID);
                }
                $("#image").css("background-position", "-"+positionX+"px 0px");
        }, interval);
        }
        
    
    }
    
    var ramona = {}
    var stills = {}
    var kim = {
        idle : function() {            
            const interval = 100;        
            setInterval(function(){
                if (positionX !== 15) {
                    positionX = positionX + 5;
                } else {
                    positionX = 0;
                }
                $("#kim-idle").css("background-position", "-"+positionX+"vw 0px");
            }, interval);
        }
    }
    
    var envy = {
        idle : function() {
            var position = 41;
    // height: 69px;
    // width: 41px;
    // background: url('../images/envy-idle.png') 0xp 0px; 
            const interval = 150;
            setInterval(function(){
                $("#image").css("background-position", "-"+position+"px 0px");
                switch (position) {
                    case 0:
                        position = 41;
                        break;
                    case 41:
                        position = 85;
                        break;
                    case 85:
                        position = 128;
                        break;
                    case 128:
                        position = 0;
                        break;
                }
            }, interval);
        },
    
        
        attack1: function() {    
        //     height: 73px;
        //     width: 51px;
        // background: url('../images/envy-kick.png') 11px 0px; 
            var positionX = 42;
            var positionY = 1;
            var width = 51
            const interval = 100;
            eKID = setInterval(function(){
                $("#image").css("background-position", "-"+positionX+"px "+positionY+"px");
                $("#image").css("width", width+"px");
                switch (positionX) {
                    case 426:
                        stopAnimate(eKID);
                        break;
                    case 42:
                        positionX = 97;
                        break;
                    case 97:
                        positionX = 156;
                        width = 70;
                        break;
                    case 156:
                        positionX = 233;
                        width = 68;
                        break;
                    case 233:
                        positionX = 304;
                        width = 64;
                        break;
                    case 304:
                        positionX = 373;
                        positionY = 0;
                        width = 51;
                        break;
                    case 373:
                        positionX = 426;
                        width = 51;
                };
            }, interval);
        },
    
        death: function() {
    //     height: 110px;
    //     width: 100px;
    
    // background: url('../images/envy-death.png') -600px 0px; 
            const interval = 100;
            var frame = 1;
            var positionX=600;
            var positionY=0;
            eDID = setInterval(function(){        
                $("#image").css("background-position", "-"+positionX+"px -"+positionY+"px");
                switch (frame) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 15:
                    case 16:
                    case 17:
                    case 18: 
                    case 19: 
                    case 20: 
                    case 22: 
                    case 23: 
                    case 24: 
                    case 25: 
                    case 26: 
                    case 27:             
                    case 29: 
                    case 30: 
                    case 31: 
                    case 32: 
                    case 33: 
                    case 34: 
                    case 36: 
                    case 37: 
                    case 38: 
                    case 39: 
                    case 40:
                    case 41:
                        frame++;
                        positionX = positionX - 100;
                        break;
                    case 7:                
                    case 14:
                    case 21:
                    case 28:
                    case 35: 
                        frame++;
                        positionX = 600;
                        positionY = positionY+111;
                        break;            
                    
                    case 42:
                    stopAnimate(eDID);
                };
            }, interval);
        }
    }
    
    function stopAnimate(arg) {
        clearInterval(arg);
        }



    //load screen
    $("#loading-screen").fadeIn(1000, function (){        
        $(document).on("click keypress", function (){
            if (scene == 0) {                
                $("#loading-screen").fadeOut("slow", function(){                    
                    $("#title-screen").fadeIn("slow", function(){
                        $("#logo").fadeIn("slow");
                        $("#logo").animate({top: '+=1vh'}, 1000)
                        $("#logo").animate({top: '-=1vh'}, 1000)
                        scene = 1;                        
                        for (i=0;i<47;i++){
                            $("#logo").animate({top: '+=1vh'}, 1000, function (){$(document).on("click keypress", function(){$("#logo").clearQueue();})});
                            $("#logo").animate({top: '-=1vh'}, 1000, function (){$(document).on("click keypress", function(){$("#logo").clearQueue();})});                            
                        }
                    });
                });
            }
        })
    });

    //scene transitions    
    $(document).on("click keypress", function(){ 
        if (scene == 1) {            
            $("#logo").clearQueue();    
            scene = 2;
            $("#logo").fadeOut(1000);            
            $("#title-screen").fadeOut(1000, function(){
                $("#character-select").fadeIn("slow");
                $.each(playableCharacters, characterFadeIn)
                $.each(playableCharacters, hoverTrigger)
                kim.idle();
                $.each(playableCharacters, selectTrigger)
            })
        }
    })

    //
    function characterFadeIn(index, value){        
        $("#"+value+"-container").fadeIn("slow");
    }
    function characterFadeOut(index, value){        
        $("#"+value+"-container").fadeOut("slow");
    }
    function hoverTrigger(index, value){
        $("#"+value+"-container").hover(function(){characterHover(value)},function(){characterHover(value)})
    }
    function characterHover(char){        
        if (scene==2 && player=="") {
            $("#"+char+"-idle").toggle();
            $("#"+char+"-running").toggle();
            $("#"+char+"-stats").toggle();            
        }
    }

    
    function selectTrigger(index, value){
        $("#"+value+"-container").on("click", function() {characterSelect(index, value)})
    }

    function characterSelect(index, value){
        if (player=="") {
            player = value;
            $("#"+value+"-idle").hide();
            $("#"+value+"-running").hide();
            $("#"+value+"-stats").hide();
            $("#"+value+"-victory").toggle();
            $("#okay").fadeIn(200);
            $("#okay").fadeOut(200);
            $("#okay").fadeIn(200);
            $("#okay").fadeOut(200);            
            $("#okay").fadeIn(200);
            $("#okay").fadeOut(200);
            $("#okay").fadeIn(200);
            $("#okay").fadeOut(200, function(){
                $.each(playableCharacters, characterFadeOut);
                $("#character-select").fadeOut("slow");
            });
        }
    }
           
    // $("#character-one").on("click", function () {
    //     if (isPlayerSelected == false) {
    //         player = "#character-one";
    //         selectedPlayer("#character-two", "#character-three");
    // }});
    
    // $("#character-two").on("click", function () {
    //     if (isPlayerSelected == false) {
    //         player = "#character-two";            
    //         selectedPlayer("#character-one", "#character-three");
    // }});
    
    // $("#character-three").on("click", function () {
    //     if (isPlayerSelected == false) {
    //         player = "#character-three";
    //         selectedPlayer("#character-one", "#character-two");
    // }});
    
    
    //     $("#enemy-one").on("click", function () {
    //     if (isEnemySelected == false) {
    //         enemy = "#enemy-one";
    //         selectedEnemy(enemy);            
    // }});
    
    // $("#enemy-two").on("click", function () {
    //     if (isEnemySelected == false) {
    //         enemy = "#enemy-two";
    //         selectedEnemy(enemy);            
    // }});
    
    // $("#enemy-three").on("click", function () {
    //     if (isEnemySelected == false) {
    //         enemy = "#enemy-three";
    //         selectedEnemy(enemy);            
    // }});

    // $("#fight").on("click", function attackButton() {
    //     console.log(playerHP);
    //     console.log(playerAttack);
    //     console.log(enemyHP);
    //     if (enemyHP > playerAttack) {
    //         enemyHP = enemyHP - playerAttack;
    //         $("#enemy-hp").text("Enemy HP: "+enemyHP);
    //         playerAttack = playerAttack + playerBase;
    //         if (enemyAttack > playerHP) {
    //             $("#fight").toggle();
    //             $("#player-hp").text("Player HP: 0")
    //             gameLose();
    //         } else {
    //             playerHP = playerHP - enemyAttack;
    //             $("#player-hp").text("Player HP: "+playerHP);
    //         }
    //     } else {
    //         enemyHP = 0; 
    //         $("#enemy-hp").text("Enemy HP: 0");
    //         deadEnemies.push(enemy);
    //         isEnemySelected = false;
    //         $(enemy).toggleClass("active-enemy");
    //         $(enemy).empty();
    //         $("#enemy-prompt").toggle();
    //         $("#fight").toggle();
    //         gameWin();
    //     }
    // });

    // function gameWin() {
    //     if (deadEnemies.indexOf("#enemy-one") > -1 && deadEnemies.indexOf("#enemy-two") > -1 && deadEnemies.indexOf("#enemy-three") > -1){
    //         $("game-over").text("You Win!")
    //     }
    // }

    // function selectedPlayer(arg1, arg2) {
    //     isPlayerSelected = true;
    //     $(arg1).toggle();
    //     $(arg2).toggle();        
    //     $("#enemy-prompt").toggle();
    //     $("#enemy-one").toggle();        
    //     $("#enemy-two").toggle();
    //     $("#enemy-three").toggle();
    //     $("#player-prompt").empty();
    //     switch (player) {
    //         case "#character-one":
    //             playerHP = 115;
    //             playerAttack = 30;
    //             playerBase = 30;                    
    //             break;
    //         case "#character-two":
    //             playerHP = 125;
    //             playerAttack = 20;
    //             playerBase = 20;                    
    //             break;
    //         case "#character-three":
    //             playerHP = 135;
    //             playerAttack = 10;
    //             playerBase = 10;                    
    //             break;
    //     }
        
    // }
    
    // function selectedEnemy(arg) {
    //     isEnemySelected = true;
    //     $(arg).attr("class","active-enemy")
    //     $(player).attr("class","active-player")
    //     $("#enemy-prompt").toggle();
    //     $("#fight").toggle();
    //     $("#player-hp").text("Player HP: "+playerHP);
    //     switch (arg) {
    //         case "#enemy-one":
    //             enemyHP = 122;
    //             enemyAttack = 10;
    //             $("#enemy-hp").text("Enemy HP: "+enemyHP);
    //             break;
    //         case "#enemy-two":
    //             enemyHP = 222;
    //             enemyAttack = 20;
    //             $("#enemy-hp").text("Enemy HP: "+enemyHP);
    //             break;
    //         case "#enemy-three":
    //             enemyHP = 322;
    //             enemyAttack = 30;
    //             $("#enemy-hp").text("Enemy HP: "+enemyHP);
    //             break;
    //     }
        
    // }


    // function gameLose () {
    //     $("#game-over").text("You lose!")
    // }




    //animations

})