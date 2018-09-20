$(document).ready(function() {
    //scene counter to track the game scene
    var scene = 0;
    //arrays containing strings of the characters and enemies
    //the chosen characters' and enemies' names will be assigned to player/enemy and the object will be assigned to playerVar/enemyVar
    var playableCharacters = ["scott", "ramona", "stills", "kim"];    
    var availableEnemies = ["matthew", "roxxy", "envy"]
    var player = "";
    var playerVar;
    var enemy = "";
    var enemyVar;
    //variables used for displaying messages, playing bgm, stopping animations
    var message= "";
    var song ="";
    var runningID=[];
    var isTextUp = false;
    var moveSequence = false;
    //variables used for combat
    var playerhp;
    var playerpow;
    var playersp;
    var enemyhp;
    var enemysp;
    //objects for each player, with their 
    var scott = {
        maxhp: 200,
        pow: 9,
        attack1: function(){motionTemplate (150, 10, 70, false, "scott", "attack1", "80vw 13.667vw")},    
        attack2: function(){motionTemplate(150, 10, 160, false, "scott", "attack2", "170vw 10.333vw")},    
        block: function(){motionTemplate(150, 7.5, 45, false, "scott", "block", "52.5vw 11vw")},
        damaged: function(){motionTemplate(150, 12, 156, false, "scott", "damaged", "168vw 16.5vw")},
        up: function(){motionTemplate(150, 13, 78, false, "scott", "up", "90vw 13vw")},
    }
        
    var ramona = {
        maxhp: 100,
        pow: 12,
        attack1: function(){motionTemplate(150, 16, 112, false, "ramona", "attack1", "128vw 18vw")},
        attack2: function(){motionTemplate(150, 18, 216, false, "ramona", "attack2", "234vw 13vw")},
        block: function(){motionTemplate(150, 9, 36, false, "ramona", "block", "45vw 11.5vw")},
        damaged: function(){motionTemplate(150, 18, 216, false, "ramona", "damaged", "234vw 15.5vw")},
        up: function(){motionTemplate(150, 18, 144, false, "ramona", "up", "162vw 15.5vw")}
    }
    var stills = {
        maxhp: 500,
        pow: 5,
        victory: function(){motionTemplate(100, 8, 32, true, "stills", "victory", "40vw 11vw")},
        attack1: function(){
            $("#stills-attack1").removeAttr("src");setTimeout(function(){
            $("#stills-attack1").attr("src","assets/images/stills/stills-attack1.gif");}, 1)
        },
        attack2: function(){
            createAnimation("stills", "attack2", "210vw 38vw");            
            var frame = 1;
            var positionX=0;
            var positionY=0;
            sDID = setInterval(function(){        
                $("#stills-attack2").css("background-position", "-"+positionX+"vw -"+positionY+"vw");
                switch (frame) {
                    case 1:case 2:case 3:case 4:case 5:case 6: 
                    case 8:case 9:case 10:case 11:case 12:
                        frame++;
                        positionX = positionX + 30;
                        break;
                    case 7:
                        frame++;
                        positionX = 0;
                        positionY = positionY + 19;
                        break;
                    case 13:
                    clearInterval(sDID);
                };
            }, 100);},
        block: function(){motionTemplate(150, 7.75, 23.25, false, "stills", "block", "31vw 11vw")},
        damaged: function(){motionTemplate(150, 16, 128, false, "stills", "damaged", "144vw 16.5vw")},
        up: function(){motionTemplate(150, 16, 96, false, "stills", "up", "112vw 16.5vw")}
    }
    var kim = {
        maxhp: 300,
        pow: 7,
        idle : function(){motionTemplate(100, 5, 15, true, "kim", "idle", "20vw 10.33vw")}, 
        attack1: function(){motionTemplate(150, 13, 39, false, "kim", "attack1", "52vw 11.5vw")},
        attack2: function(){motionTemplate(150, 21, 231, false, "kim", "attack2", "252vw 14vw")},
        block: function(){motionTemplate(150, 7, 21, false, "kim", "block", "28vw 12vw")},
        damaged: function(){
            createAnimation("kim", "damaged", "193.5vw 33vw");            
            var frame = 1;
            var positionX=0;
            var positionY=0;
            kDID = setInterval(function(){        
                $("#kim-damaged").css("background-position", "-"+positionX+"vw -"+positionY+"vw");
                switch (frame) {
                    case 1:case 2:case 3:case 4:case 5:case 6: case 7:
                    case 8:case 10:case 11:case 12:case 13:case 14:case 14:
                        frame++;
                        positionX = positionX + 21.5;
                        break;
                    case 9:
                        frame++;
                        positionX = 0;
                        positionY = positionY + 16.5;
                        break;
                    case 15:
                    clearInterval(kDID);
                };
            }, 100);},
        up: function(){motionTemplate(150, 20, 80, false, "kim", "up", "100vw 16.5vw")}
    }
    var characterVarArray = [scott, ramona, stills, kim]    
    var matthew = {        
        maxhp: 100,
        pow: 10,
        idle: function(){motionTemplate(100, 8.8, 42.8, true, "matthew", "idle", "52.8vw 10.45vw")}, 
        running: function(){motionTemplate(100, 10, 70, true, "matthew", "running", "80vw 13vw")}, 
        attack1: function(){motionTemplate(150, 16.5, 82.5, false, "matthew", "attack1", "100vw 11vw")},
        attack2: function(){motionTemplate(150, 13, 182, false, "matthew", "attack2", "195vw 38vw")},
        damaged: function(){motionTemplate(150, 13, 169, false, "matthew", "damaged", "182vw 18vw")},
        up: function(){motionTemplate(150, 15, 150, false, "matthew", "up", "165vw 18vw")},
        death: function(){motionTemplate(150, 19, 228, false, "matthew", "death", "247vw 23vw")}
    }
    var roxxy = {
        maxhp: 250,
        pow: 20,
        idle: function(){motionTemplate(100, 11, 55, true, "roxxy", "idle", "66vw 10vw")}, 
        running: function(){motionTemplate(100, 10, 50, true, "roxxy", "running", "60vw 16.5vw")}, 
        attack1: function(){motionTemplate(150, 16.5, 49.5, false, "roxxy", "attack1", "66vw 21vw")},
        attack2: function(){
            $("#roxxy-attack2").removeAttr("src");setTimeout(function(){
            $("#roxxy-attack2").attr("src","assets/images/roxxy/roxxy-attack2.gif");}, 1)
        },
        damaged: function(){
            $("#roxxy-damaged").removeAttr("src");setTimeout(function(){
            $("#roxxy-damaged").attr("src","assets/images/roxxy/roxxy-damaged.gif");}, 1)
        },
        up: function(){motionTemplate(150, 18, 72, false, "roxxy", "up", "90vw 16.5vw")},
        death: function(){
            createAnimation("roxxy", "death", "240vw 90vw");                        
            var positionX=0;
            var positionY=0;
            rDID = setInterval(function(){        
                $("#roxxy-death").css("background-position", "-"+positionX+"vw -"+positionY+"vw");
                if (positionX != 210) {
                    positionX = positionX +30;                    
                } else {                    
                    if (positionY !=67.5) {
                        positionY = positionY + 22.5;
                        positionX = 0;                        
                    } else {
                        clearInterval(rDID);
                    }                
                };
            }, 120);
        }
    }
    var envy = {
        maxhp: 500,
        pow: 30,
        idle : function() {motionTemplate(100, 7.5, 22.5, true, "envy", "idle", "30vw 11.5vw")},
        running: function() {
            $("#envy-running").removeAttr("src");setTimeout(function(){
            $("#envy-running").attr("src","assets/images/envy/envy-running.gif");}, 1)},
        attack1: function() {motionTemplate(150, 12, 72, false, "envy", "attack1", "84vw 12.5vw")},
        attack2: function() {
            $("#envy-summon").removeAttr("src");setTimeout(function(){
            $("#envy-summon").attr("src","assets/images/envy/envy_angry.gif");}, 1)
            $("#lynette").removeAttr("src");setTimeout(function(){
            $("#lynette").attr("src","assets/images/envy/lynette.gif");}, 1)},
        damaged : function() {motionTemplate(100, 17.5, 140, false, "envy", "damaged", "157.5vw 15.5vw")},
        up : function() {motionTemplate(100, 17.5, 157.5, false, "envy", "up", "175vw 15.5vw")},
        death: function() {            
            createAnimation("envy", "death", "115.5vw 111vw");
            var positionX=0;
            var positionY=0;
            eDID = setInterval(function(){        
                $("#envy-death").css("background-position", "-"+positionX+"vw -"+positionY+"vw");
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
            }, 120);
        }
    }
    var enemyVarArray = [matthew, roxxy, envy]
    
    //load screen
    $("#loading-screen").fadeIn(1000, function (){        
        $(document).on("click keypress", function (){
            if (scene == 0) {                
                $("#loading-screen").fadeOut("slow", function(){
                    song = "#title-music"
                    $(song).html('<source src="assets/music/01 Scott Pilgrim Anthem.mp3" type="audio/mp3">');
                    $(song).get(0).play();
                    $(song).get(0).volume = 0.2;
                    $("#title-screen").attr("src", "assets/images/title-top.png")
                    $("#title-screen").fadeIn("slow", function(){
                        $("#logo").attr("src","assets/images/logo.png")
                        $("#logo").fadeIn("slow");
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
                $("#character-select").fadeIn("slow");
                $.each(playableCharacters, characterFadeIn)
                $.each(playableCharacters, hoverTrigger)
                kim.idle();                
                $.each(playableCharacters, selectTrigger)
            })
        } 
        if (isTextUp && $("#text-message").text !== "" && moveSequence == false) {
            $("#text-menu").hide("slow");
            $("#text-message").text("")
            $("#fight-menu").show("slow");
            isTextUp = false;
        } 
    })

    function characterFadeIn(index, value){
        $("#"+value+"-container").fadeIn("slow");
        if (value !== "kim") {
            $("#"+value+"-idle").attr("src","assets/images/"+value+"/"+value+"-idle.gif")
        }
        $("#"+value+"-running").attr("src","assets/images/"+value+"/"+value+"_dash.gif")
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
        } else if (scene==3 || scene == 5 || scene == 7){
            $("#"+char+"-idle").toggle();
            $("#"+char+"-running").toggle();
            $("#"+char+"-difficulty").toggle();
        }
    }

    function selectTrigger(index, value){
        $("#"+value+"-container").on("click", function() {characterSelect(index, value)})
    }

    function characterSelect(index, value){
        if (player=="") {
            scene = 3
            player = value;
            $.each(playableCharacters, function(index, name){
                $("#"+name+"-stats").remove()
                if (name == player ){
                    $("#"+name+"-running").remove();
                } else {
                    $("#"+name+"-container").remove();
                }
            })
            playerVar = characterVarArray[playableCharacters.indexOf(value)]
            playerhp = playerVar.maxhp;
            playerpow = playerVar.pow;            
            $("#"+player+"-idle").hide();
            $("#"+player+"-running").hide();
            $("#"+player+"-stats").hide();
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
                $("#character-select").fadeOut("slow", function(){
                    $("#"+value+"-victory").hide();
                    clearAllIntervals();
                    $("#enemy-select").attr("src","assets/images/school.png")
                    $("#enemy-select").fadeIn("slow")
                    $("#matthew-container").fadeIn("slow",matthew.idle());
                    matthew.running();
                    $("#roxxy-container").fadeIn("slow",roxxy.idle());
                    roxxy.running();
                    $("#envy-container").fadeIn("slow",envy.idle());
                    envy.running();
                    $.each(availableEnemies, hoverTrigger)
                    $.each(availableEnemies, selectTrigger)
                    });                
            });
        } else if (enemy=="" && scene == 3 || scene == 5 || scene == 7){
            scene++;
            enemy = value;
            enemyVar = enemyVarArray[availableEnemies.indexOf(value)];
            enemyhp = enemyVar.maxhp;
            playersp = 0;
            enemysp = 0;
            playerhp = playerVar.maxhp;
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
                $("#enemy-select").fadeOut("slow", function(){
                    $("#"+enemy+"-difficulty").remove();
                    $(song).remove();
                    clearAllIntervals();
                    battlescene();
                })
            })
        }
    }

    function displayText(message){
        $("#text-message").text(message)
        $("#text-menu").show(1);
        $("#fight-menu").hide(1, function(){isTextUp = true;});        
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
                    $("#"+player+"-container").fadeOut("slow");
                    $("#"+player+"-victory").fadeOut("slow");
                    $(".layer3").fadeOut("slow");
                    $("#"+enemy+"-damaged").fadeOut("slow");                    
                    $("#"+enemy+"-background").fadeOut("slow", function(){                    
                    clearAllIntervals();
                    returnToEnemySelect();
                    })
                }, 6000)
            }, 1000);
        } else {
            resolveDamageTaken(type)
        }
    }

    function resolveDamageTaken(type){
        var waiting = 1000;
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
                displayText(enemy+" uses a special!");
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
                    displayText("game over..")
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
        $("#"+player+"-attack1").show();
        $("#"+player+"-idle").hide();
        playerVar.attack1();        
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
    
    function returnToEnemySelect(){
        scene++;
        console.log(scene);        
        $("#enemy-select").fadeIn("slow");
        $("#"+enemy+"-container").remove();
        $("#"+enemy+"-death").fadeIn("3000", enemyVar.death())
        if (scene == 5){
            $("#suspense").html('<source src="assets/music/suspense.mp3" type="audio/mp3">');
            $("#suspense").get(0).play();
            $("#suspense").get(0).volume = 0.2;
        } else {
            $("#suspense").get(0).currentTime=0;
            $("#suspense").get(0).play();
            $("#suspense").get(0).volume = 0.2;
        }
        setTimeout(function(){
            $.each(availableEnemies, function(ind, val){            
                $("#"+val+"-container").fadeIn("slow",enemyVarArray[ind].idle());
                enemyVarArray[ind].running()
            })
            $("#"+enemy+"-death").remove();                
            availableEnemies.splice(availableEnemies.indexOf(enemy), 1);
            enemyVarArray.splice(enemyVarArray.indexOf(enemyVar), 1);
            $.each(availableEnemies, hoverTrigger)
            $.each(availableEnemies, selectTrigger)                
            $("#suspense").get(0).pause();                
            $("#suspense").get(0).currentTime = 0;
            setTimeout(function(){
                if (scene == 5){
                    song = "#select-music"
                    $(song).html('<source src="assets/music/characterselect.mp3" type="audio/mp3">')
                    $(song).get(0).play();
                    $(song).get(0).volume = 0.2
                } else if (scene == 7) {
                    song = "#boss-rush"
                    $(song).html('<source src="assets/music/bossrush.mp3" type="audio.mp3">')
                    $(song).get(0).play();
                    $(song).get(0).volume = 0.2
                } else if (scene == 9) {
                    $("#end-music").html('<source src="assets/music/the-end.mp3" type="audio.mp3">')
                    $("#end-music").get(0).play();
                    $("#end-music").get(0).volume = 0.2
                    $("#enemy-select").fadeOut("slow")
                    $("#the-end").attr("src", "assets/images/endscreen.jpg")
                    $("#the-end").fadeIn("slow");
                }
            }, 7000);
        },6000)        
    };
    
    function battlescene(){
        $("#"+enemy+"-music").html('<source src="assets/music/'+enemy+'-music.mp3" type="audio/mp3">');
        $("#"+enemy+"-music").get(0).play();
        $("#"+enemy+"-music").get(0).volume = 0.2;
        $("#player-hp-bar").css("width", "10vw")
        $("#enemy-hp-bar").css("width", "10vw")        
        $("#player-sp-bar").css("width", "0vw")
        $("#enemy-sp-bar").css("width", "0vw")
        $("#enemy-hp-num").text(enemyhp+"/"+enemyhp);        
        $("#player-hp-num").text(playerhp+"/"+playerhp);        
        $("#enemy-sp-num").text("0/100");        
        $("#player-sp-num").text("0/100");
        $("#"+enemy+"-background").attr("src","assets/images/"+enemy+"/"+enemy+"-background.png");
        $("#"+enemy+"-background").fadeIn("slow");
        $("#"+player+"-idle").show();
        if (availableEnemies.length == 3){
            $("#"+player+"-container").css({"top": "30vw", "left": "26vw"})
        }
        if (player == "kim"){
            kim.idle()
        }        
        $("#"+player+"-container").fadeIn("slow")
        $("#"+enemy+"-container").css({"top": "30vw", "left": "60vw"})
        $("#"+enemy+"-idle").show();
        enemyVar.idle()
        $("#"+enemy+"-container").fadeIn("slow", function(){            
            $("#player-stats").show();            
            $("#enemy-stats").show();            
            displayText(enemy+" is ready to battle!")
            moveSequence = false;
        })
    }

    function motionTemplate(time, stepX, lastframe, loop, who, action, size) {
        createAnimation(who, action, size)        
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
    
    function createAnimation(who, action, bg){
        $("#"+who+"-"+action).css("background", "url('assets/images/"+who+"/"+who+"-"+action+".png') 0px 0px")
        $("#"+who+"-"+action).css("background-size", bg)
    }

    function clearAllIntervals(){
        for (i=0;i<runningID.length;i++){
            clearInterval(runningID[i]);
        }
    }
})