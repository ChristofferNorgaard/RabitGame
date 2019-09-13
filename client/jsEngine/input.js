jse.input = {};

// Public
jse.input.isKeyDown = function(keyCode) {
    return jse.input.keyState[keyCode];
};


// Internal
jse.input.bindEvents = function() {
    jse.input.keyState = {};
    $(document).keydown(function(e){
        jse.input.keyState[e.which] = true;
    });
    $(document).keyup(function(e){
        jse.input.keyState[e.which] = false;
    });
};

$(document).ready(function(){
    jse.input.bindEvents();
});

