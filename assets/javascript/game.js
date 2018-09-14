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

})