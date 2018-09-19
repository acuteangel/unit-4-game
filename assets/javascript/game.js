$(document).ready(function() {
    var scene = 0;
    // var positionX = 0
    var playableCharacters = ["scott", "ramona", "stills", "kim"];    
    var availableEnemies = ["matthew"]    
    var player = "";
    var playerVar;
    var enemy = "";
    var enemyVar;
    var message= "";
    var runningID=[];
    var isTextUp = false;
    var moveSequence = false;
    var playerhp;
    var playerpow;
    var playersp = 0;
    var enemyhp;
    var enemysp = 0;
    var scott = {
        maxhp: 100,
        pow: 105,
        attack1: function(){motionTemplate (100, 10, 70, false, "scott", "attack1", "80vw 13.667vw")},    
        attack2: function(){motionTemplate(100, 10, 160, false, "scott", "attack2", "170vw 10.333vw")},    
        block: function(){motionTemplate(100, 7.5, 45, false, "scott", "block", "52.5vw 11vw")},
        damaged: function(){motionTemplate(100, 12, 156, false, "scott", "damaged", "168vw 16.5vw")},
        up: function(){motionTemplate(100, 13, 78, false, "scott", "up", "90vw 13vw")},
    }
    
    function motionTemplate(time, stepX, lastframe, loop, who, action, size) {
        if ($("#"+who+"-"+action).attr("style") == undefined){
            createAnimation(who, action, size)            
        }
        {$("#"+who+"-"+action).css("background-position", "0vw 0vw");}
        const interval = time;
        var positionX = 0;
        var ID = setInterval(function(){            
                if (positionX !== lastframe) {
                    positionX = positionX + stepX;                
                } else if (loop) {
                    positionX = 0;
                } else {
                clearInterval(ID);}
                {$("#"+who+"-"+action).css("background-position", "-"+positionX+"vw 0vw");}
        }, interval);
        runningID.push(ID);
    }

    function clearAllIntervals(){
        for (i=0;i<runningID.length;i++){
            clearInterval(runningID[i]);
        }
    }

    var ramona = {
        maxhp: 100,
        pow: 5,
        attack1: function(){motionTemplate(100, 16, 112, false, "ramona", "attack1", "128vw 18vw")},
        attack2: function(){motionTemplate(100, 18, 216, false, "ramona", "atack2", "234vw 13vw")},
        block: function(){},
        damaged: function(){motionTemplate(100, 18, 216, false, "ramona", "damaged", "234vw 15.5vw")},
        up: function(){}
    }
    var stills = {
        maxhp: 100,
        pow: 5,
        victory: function(){motionTemplate(100, 8, 32, true, "stills", "victory", "40vw 11vw")} 
    }
    var kim = {
        maxhp: 100,
        pow: 5,
        idle : function(){motionTemplate(100, 5, 15, true, "kim", "idle", "20vw 10.33vw")}, 
    }
    var characterVarArray = [scott, ramona, stills, kim]    
    var matthew = {
        isDead: false,
        maxhp: 100,
        pow: 5,
        idle: function(){motionTemplate(100, 8.8, 42.8, true, "matthew", "idle", "52.8vw 10.45vw")}, 
        running: function(){motionTemplate(100, 10, 70, true, "matthew", "running", "80vw 11vw")}, 
        attack1: function(){motionTemplate(100, 16.5, 82.5, false, "matthew", "attack1", "100vw 11vw")},
        attack2: function(){motionTemplate(100, 13, 182, false, "matthew", "attack2", "195vw 38vw")},
        damaged: function(){motionTemplate(100, 13, 169, false, "matthew", "damaged", "182vw 17vw")},
        up: function(){motionTemplate(100, 15, 150, false, "matthew", "up", "165vw 16vw")},
    }
    var envy = {
        isDead: false,
        maxhp: 100,
        pow: 5,
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
                    case 1:case 2:case 3:case 4:case 5:case 6:
                    case 8:case 9:case 10:case 11:case 12:case 13:
                    case 15:case 16:case 17:case 18: case 19: case 20:
                    case 22:case 23:case 24:case 25:case 26:case 27:             
                    case 29:case 30: case 31: case 32: case 33: case 34: 
                    case 36: case 37: case 38: case 39: case 40:case 41:
                        frame++;
                        positionX = positionX - 100;
                        break;
                    case 7:case 14:case 21:case 28:case 35: 
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
    var enemyVarArray = [matthew]    
    
    function stopAnimate(arg) {
        clearInterval(arg);
        }



    //load screen
    $("#loading-screen").fadeIn(1000, function (){        
        $(document).on("click keypress", function (){
            if (scene == 0) {                
                $("#loading-screen").fadeOut("fast", function(){
                    $("#title-music").html('<source src="assets/music/01 Scott Pilgrim Anthem.mp3" type="audio/mp3">');
                    $("#title-music").get(0).play();
                    $("#title-music").get(0).volume = 0.2;
                    $("#title-screen").attr("src", "assets/images/title-top.png")
                    $("#title-screen").fadeIn("fast", function(){
                        $("#logo").attr("src","assets/images/logo.png")
                        $("#logo").fadeIn("fast");
                        $("#logo").animate({top: '+=1vh'}, 1000)
                        $("#logo").animate({top: '-=1vh'}, 1000)
                        scene = 1;                        
                        for (i=0;i<10;i++){
                            $("#logo").animate({top: '+=1vh'}, 1000, function (){$(document).on("click keypress", function(){$("#logo").clearQueue();})});
                            $("#logo").animate({top: '-=1vh'}, 1000, function (){$(document).on("click keypress", function(){$("#logo").clearQueue();})});
                        }
                        setTimeout(function() {
                            if (scene==1){                            
                            $(document).keypress();}}, 20000)
                        
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
                $("#character-select").attr("src","assets/images/char-select.jpg")
                $("#character-select").fadeIn("fast");
                $.each(playableCharacters, characterFadeIn)
                $.each(playableCharacters, hoverTrigger)
                kim.idle();                
                $.each(playableCharacters, selectTrigger)
            })
        } 
        if (isTextUp && $("#text-message").text !== "" && moveSequence == false) {
            $("#text-menu").hide("fast");
            $("#text-message").text("")
            $("#fight-menu").show("fast");
            isTextUp = false;
        } 
    })

    function displayText(message){
        $("#text-message").text(message)
        $("#text-menu").show("fast");
        $("#fight-menu").hide("fast", function(){isTextUp = true;});        
    }

    function resolveDamageDealt(type){
        if (type == "attack2"){
            playerpow = 2*(playerpow + playerVar.pow)
        }
        displayText(player+" hits for "+playerpow+" damage!")
        if (playerpow < enemyhp) {
            enemyhp = enemyhp - playerpow;
        } else {
            enemyhp = 0;
        }
        barShift(enemyhp, enemyVar.maxhp, "enemy", "hp");
        if (type=="attack2"){
            playerpow= playerpow/2
            barShift(0, 100, "player", "sp")
        }else {
            playerpow = playerpow + playerVar.pow;
            if (playersp<100){playersp = playersp+50;}
            if (playersp==100){$("#attack2-button").prop("disabled", false)}
            barShift(playersp, 100, "player", "sp")
        }
        if (enemyhp==0){
            $("#text-menu").hide();
            $("#ko").attr("src","assets/images/ko2.png");
            $("#ko").fadeIn(1000);
            setTimeout( function(){
                $("#"+enemy+"-music").get(0).pause();
                $("#"+enemy+"-music").remove();
                $("#area-clear").html('<source src="assets/music/area-clear.mp3" type="audio/mp3">');
                $("#area-clear").get(0).play();
                $("#area-clear").get(0).volume = 0.2;
                $("#"+player+"-"+type).hide();                                   
                $("#"+player+"-victory").show();
                if (player == "stills"){stills.victory();}
                setTimeout(function(){
                    $("#"+player+"-container").fadeOut("fast");
                    $("#"+player+"-victory").fadeOut("fast");
                    $(".layer3").fadeOut("fast");
                    $("#"+enemy+"-damaged").fadeOut("fast");                    
                    $("#"+enemy+"-background").fadeOut("fast", function(){                    
                    clearAllIntervals();
                    })
                }, 6000)
            }, 1000);
        } else {
            resolveDamageTaken(type)
        }
    }

    function resolveDamageTaken(type){
        var waiting = 2000;
        if (type !=="block"){
            waiting = 4000;
            setTimeout(function(){            
            $("#"+enemy+"-damaged").hide();
            $("#"+enemy+"-up").show();
            enemyVar.up();            
            $("#"+player+"-"+type).hide();
            $("#"+player+"-idle").show();
         }, 2000);}
         setTimeout(function(){
            var enemyAttacking = "attack1";
            $("#"+enemy+"-idle").hide();
            if (enemysp == 100){
                enemyAttacking = "attack2";
                enemyVar.pow = enemyVar.pow*4;
                displayText(enemy+" uses a special!")                
                $("#"+enemy+"-attack2").show();
                $("#"+enemy+"-up").hide();
                enemyVar.attack2();
            }else{
                displayText(enemy+" attacks!");
                $("#"+enemy+"-attack1").show();
                $("#"+enemy+"-up").hide();
                enemyVar.attack1();
            }
            if (type !=="block"){
                setTimeout(function(){
                    $("#"+player+"-idle").hide();
                    $("#"+player+"-damaged").show();
                    playerVar.damaged();
                }, 2000);
            } else {    
                setTimeout(function(){
                    displayText("but "+player+" blocks!");                    
                    $("#"+player+"-block").show();
                    $("#"+player+"-idle").hide();
                    playerVar.block();
                    enemyVar.pow = enemyVar.pow/4
                }, 2000);
            }
            setTimeout(function(){               
                displayText(enemy+" hits for "+Math.round(enemyVar.pow)+" damage!")
                if (Math.round(enemyVar.pow) < playerhp) {
                    playerhp = playerhp - Math.round(enemyVar.pow);                
                    barShift(playerhp, playerVar.maxhp, "player", "hp");
                    if (enemyAttacking=="attack2"){
                        enemyVar.pow= enemyVar.pow/4;
                        enemysp = 0;
                        barShift(0, 100, "enemy", "sp")
                    }else {
                        if (enemysp < 100){enemysp = enemysp+50;}
                        barShift(enemysp, 100, "enemy", "sp")
                    }
                    if (type=="block"){enemyVar.pow=enemyVar.pow*4}
                    setTimeout(function(){
                        if (type != "block"){
                            $("#"+player+"-damaged").hide();
                            $("#"+player+"-up").show();
                            playerVar.up();
                            setTimeout(function(){
                                $("#"+player+"-up").hide();
                                $("#"+player+"-idle").show();
                            }, 1000)
                        } else {
                            $("#"+player+"-block").hide();
                            $("#"+player+"-idle").show();
                        }
                        $("#"+enemy+"-"+enemyAttacking).hide();
                        $("#"+enemy+"-idle").show();                        
                        $("#fight-menu").show();
                        moveSequence = false;
                    }, 2000);
                } else {
                    playerhp = 0;
                    barShift(playerhp, playerVar.maxhp, "player", "hp");
                    $("#game-over").html('<source src="assets/music/Game-Over.mp3" type="audio/mp3">');
                    $("#game-over").get(0).play();
                    $("#game-over").get(0).volume = 0.2;
                }
             }, 4000);
         }, waiting);
    }
    
    function barShift(min, max, who, which){
        var newWidth = (10 * min)/max
        newWidth = newWidth + "vw"
        $("#"+who+"-"+which+"-bar").animate({width: newWidth}, function(){$("#"+who+"-"+which+"-num").text(min+"/"+max)});
    }
    
    $("#attack1-button").on("click", function(){

        moveSequence = true;
        displayText(player+" attacks!");
        if (player == "stills") {
            $("#stills-attack1").attr("src","assets/images/stills/stills-attack1.gif");
            $("#stills-attack1").show();
            $("#stills-idle").hide();
        } else {
            $("#"+player+"-attack1").show();
            $("#"+player+"-idle").hide();
            playerVar.attack1();
        }
        setTimeout(function(){
            $("#"+enemy+"-idle").hide();
            $("#"+enemy+"-damaged").show();
            enemyVar.damaged();
            resolveDamageDealt("attack1")
        }, 2000);

    })

    $("#attack2-button").on("click", function(){
        moveSequence = true;
        displayText(player+" uses a special!");
        playerVar.attack2();
        $("#"+player+"-attack2").show();
        $("#"+player+"-idle").hide();        
        setTimeout(function(){
            playersp = 0;
            $("#attack2-button").attr("disabled", "disabled")
            $("#"+enemy+"-idle").hide();
            $("#"+enemy+"-damaged").show();
            enemyVar.damaged();
            resolveDamageDealt("attack2")
        }, 2000);
    })
    
    $("#block-button").on("click", function(){
        moveSequence = true;
        displayText("");
        resolveDamageTaken("block")
    })

    $("#flee-button").on("click", function(){
        displayText("Can't flee this fight!");
    })

    //
    function characterFadeIn(index, value){
        $("#"+value+"-container").fadeIn("fast");
        if (value !== "kim") {
            $("#"+value+"-idle").attr("src","assets/images/"+value+"/"+value+"-idle.gif")
        }
        $("#"+value+"-running").attr("src","assets/images/"+value+"/"+value+"_dash.gif")
    }
    function characterFadeOut(index, value){        
        $("#"+value+"-container").fadeOut("fast");
    }
    function hoverTrigger(index, value){
        $("#"+value+"-container").hover(function(){characterHover(value)},function(){characterHover(value)})
    }
    function characterHover(char){        
        if (scene==2 && player=="") {
            $("#"+char+"-idle").toggle();
            $("#"+char+"-running").toggle();
            $("#"+char+"-stats").toggle();
        } else if (scene==3 && char=="matthew"){
            $("#"+char+"-idle").toggle();
            $("#"+char+"-running").toggle();
        }
    }
    function createAnimation(who, action, bg){
        $("#"+who+"-"+action).css("background", "url('assets/images/"+who+"/"+who+"-"+action+".png') 0px 0px")
        $("#"+who+"-"+action).css("background-size", bg)
    }

    
    function selectTrigger(index, value){
        $("#"+value+"-container").on("click", function() {characterSelect(index, value)})
    }

    function characterSelect(index, value){
        if (player=="") {
            scene = 3
            player = value;
            playerVar = characterVarArray[playableCharacters.indexOf(value)]
            playerhp = playerVar.maxhp;
            playerpow = playerVar.pow;            
            $("#"+value+"-idle").hide();
            $("#"+value+"-running").hide();
            $("#"+value+"-stats").hide();
            if(player !== "stills"){
                $("#"+value+"-victory").attr("src","assets/images/"+value+"/"+value+"_victory.gif")
                $("#"+value+"-victory").toggle();                
            } else if (player == "stills"){
                stills.victory();
            }
            $("#okay").attr("src","assets/images/okay2.png");
            // $("#okay").fadeIn(200);
            // $("#okay").fadeOut(200);
            // $("#okay").fadeIn(200);
            // $("#okay").fadeOut(200);            
            // $("#okay").fadeIn(200);
            // $("#okay").fadeOut(200);
            $("#okay").fadeIn(200);
            $("#okay").fadeOut(200, function(){
                $.each(playableCharacters, characterFadeOut);
                $("#character-select").fadeOut("fast", function(){
                    $("#"+value+"-victory").hide();
                    clearAllIntervals();
                    $("#enemy-select").attr("src","assets/images/school.png")
                    $("#enemy-select").fadeIn("fast")
                    $("#matthew-container").fadeIn("fast",matthew.idle());
                    matthew.running();
                    $.each(availableEnemies, hoverTrigger)
                    $.each(availableEnemies, selectTrigger)
                    });                
            });
        } else if (enemy=="" && scene == 3){
            scene = 4
            enemy = value;
            enemyVar = enemyVarArray[availableEnemies.indexOf(value)];
            enemyhp = enemyVar.maxhp;
            $("#"+value+"-idle").hide();
            $("#"+value+"-running").show();
            
            // $("#okay").fadeIn(200);
            // $("#okay").fadeOut(200);
            // $("#okay").fadeIn(200);
            // $("#okay").fadeOut(200);            
            // $("#okay").fadeIn(200);
            // $("#okay").fadeOut(200);
            $("#okay").fadeIn(200);
            $("#okay").fadeOut(200, function(){
                $.each(availableEnemies, characterFadeOut);
                $("#"+value+"-running").hide();
                $("#enemy-select").fadeOut("fast", function(){
                    $("#title-music").get(0).pause();
                    clearAllIntervals();
                    battlescene();
                })
            })
        }
    }

    function battlescene(){
        $("#"+enemy+"-music").html('<source src="assets/music/'+enemy+'-music.mp3" type="audio/mp3">');
        $("#"+enemy+"-music").get(0).play();
        $("#"+enemy+"-music").get(0).volume = 0.2;
        $("#enemy-hp-num").text(enemyhp+"/"+enemyhp);        
        $("#player-hp-num").text(playerhp+"/"+playerhp);
        $("#"+enemy+"-background").attr("src","assets/images/"+enemy+"/"+enemy+"-background.png");
        $("#"+enemy+"-background").fadeIn("fast");
        $("#"+player+"-idle").show();
        if (availableEnemies.length == 1){
            $("#"+player+"-container").css({"top": "30vw", "left": "26vw"})
        }
        if (player == "kim"){
            kim.idle()
        }        
        $("#"+player+"-container").fadeIn("fast")
        $("#"+enemy+"-container").css({"top": "30vw", "left": "60vw"})
        $("#"+enemy+"-idle").show();
        if (enemy == "matthew") {
            matthew.idle()
        }
        $("#"+enemy+"-container").fadeIn("fast", function(){            
            $("#player-stats").show();            
            $("#enemy-stats").show();            
            displayText(enemy+" is ready to battle!")
        })
    }

    
           
    
})