$(document).ready(function() {
    var isPlayerSelected = false;
    var isEnemySelected = false;
    var player = "";
    var enemy= "";
    var playerHP = 0;
    var playerAttack = 0;
    var enemyHP = 0;
    var enemyAttack = 0;
    var playerBase = 0;
    var deadEnemies = [];

    //game start
    $("#start-button").on("click",function() {
        $("#title").empty();
        $("#start-button").empty();
        $("#character-one").toggle();
        $("#character-two").toggle();        
        $("#character-three").toggle();
        $("#player-prompt").toggle();
        })

    
    $("#character-one").on("click", function () {
        if (isPlayerSelected == false) {
            player = "#character-one";
            selectedPlayer("#character-two", "#character-three");
    }});
    
    $("#character-two").on("click", function () {
        if (isPlayerSelected == false) {
            player = "#character-two";            
            selectedPlayer("#character-one", "#character-three");
    }});
    
    $("#character-three").on("click", function () {
        if (isPlayerSelected == false) {
            player = "#character-three";
            selectedPlayer("#character-one", "#character-two");
    }});
    
    
        $("#enemy-one").on("click", function () {
        if (isEnemySelected == false) {
            enemy = "#enemy-one";
            selectedEnemy(enemy);            
    }});
    
    $("#enemy-two").on("click", function () {
        if (isEnemySelected == false) {
            enemy = "#enemy-two";
            selectedEnemy(enemy);            
    }});
    
    $("#enemy-three").on("click", function () {
        if (isEnemySelected == false) {
            enemy = "#enemy-three";
            selectedEnemy(enemy);            
    }});

    $("#fight").on("click", function attackButton() {
        console.log(playerHP);
        console.log(playerAttack);
        console.log(enemyHP);
        if (enemyHP > playerAttack) {
            enemyHP = enemyHP - playerAttack;
            $("#enemy-hp").text("Enemy HP: "+enemyHP);
            playerAttack = playerAttack + playerBase;
            if (enemyAttack > playerHP) {
                $("#fight").toggle();
                $("#player-hp").text("Player HP: 0")
                gameLose();
            } else {
                playerHP = playerHP - enemyAttack;
                $("#player-hp").text("Player HP: "+playerHP);
            }
        } else {
            enemyHP = 0; 
            $("#enemy-hp").text("Enemy HP: 0");
            deadEnemies.push(enemy);
            isEnemySelected = false;
            $(enemy).toggleClass("active-enemy");
            $(enemy).empty();
            $("#enemy-prompt").toggle();
            $("#fight").toggle();
            gameWin();
        }
    });

    function gameWin() {
        if (deadEnemies.indexOf("#enemy-one") > -1 && deadEnemies.indexOf("#enemy-two") > -1 && deadEnemies.indexOf("#enemy-three") > -1){
            $("game-over").text("You Win!")
        }
    }

    function selectedPlayer(arg1, arg2) {
        isPlayerSelected = true;
        $(arg1).toggle();
        $(arg2).toggle();        
        $("#enemy-prompt").toggle();
        $("#enemy-one").toggle();        
        $("#enemy-two").toggle();
        $("#enemy-three").toggle();
        $("#player-prompt").empty();
        switch (player) {
            case "#character-one":
                playerHP = 115;
                playerAttack = 30;
                playerBase = 30;                    
                break;
            case "#character-two":
                playerHP = 125;
                playerAttack = 20;
                playerBase = 20;                    
                break;
            case "#character-three":
                playerHP = 135;
                playerAttack = 10;
                playerBase = 10;                    
                break;
        }
        
    }
    
    function selectedEnemy(arg) {
        isEnemySelected = true;
        $(arg).attr("class","active-enemy")
        $(player).attr("class","active-player")
        $("#enemy-prompt").toggle();
        $("#fight").toggle();
        $("#player-hp").text("Player HP: "+playerHP);
        switch (arg) {
            case "#enemy-one":
                enemyHP = 122;
                enemyAttack = 10;
                $("#enemy-hp").text("Enemy HP: "+enemyHP);
                break;
            case "#enemy-two":
                enemyHP = 222;
                enemyAttack = 20;
                $("#enemy-hp").text("Enemy HP: "+enemyHP);
                break;
            case "#enemy-three":
                enemyHP = 322;
                enemyAttack = 30;
                $("#enemy-hp").text("Enemy HP: "+enemyHP);
                break;
        }
        
    }


    function gameLose () {
        $("#game-over").text("You lose!")
    }




    //animations


    function envyIdle() {
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
        }}, interval);
}

    
function envyKick() {    
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
    }

function envyDeath() {    
//     height: 110px;
//     width: 100px;

// background: url('../images/envy-death.png') 1px 0px; 
    const interval = 100;
    var frame = 1;
    var positionX=0;
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
                positionX = positionX + 100;
                break;
            case 7:                
            case 14:
            case 21:
            case 28:
            case 35: 
                frame++;
                positionX = 0;
                positionY = positionY+111;
                break;            
            
            case 42:
            stopAnimate(eDID);
    };
    }, interval);
    })

function stopAnimate(arg) {
    clearInterval(arg);
    }