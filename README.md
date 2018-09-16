# unit-4-game
title scene
    fade in
    title
    slow blinking start button
    blinks faster upon clicking
    fade out

character selection scene
    fade in
    show characters, standing still
    idle/walk on hover or icons
    on click show stats
    prompt start or cancel    
    fade out

level selection scene
    fade in
    show available enemies
    on click show stats
    prompt start or cancel
    fade out

fight scene
    fade in
    spawn character and enemies with hp and special bars, in idle animations
    make buttons available for attack or block
        on attack, play attack animation, then damage animation, then change hp
        on block, play bock animation
        both followed by enemy attack
        if blocking, stagger and receive half damage
        else damage animation then change hp
    if hp would be negative, slow mo damage and attack KO, lower hp bar
    play death animation
    enemy dies, return to level selection
    player dies, game over

character object {
    hp: x
    sp: y
    idle: function
    attack1: function
    attack2: function
    death: function
}
when player attacks:
    player attack increases by base amount
    special mete?