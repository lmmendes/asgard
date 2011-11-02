(function(asgard){
    
    var self = this;
    
    var input = asgard.Input = {};
    
    var keymap = {
        "enter": 35
    };
    
    var keyup_callbacks   = [];
    var keydown_callbacks = [];
    var pressed_keys      = [];
    
    // input.on('enter', function{}, 'keydown')    
    input.on = function(key, callback, action){
        
        !action && ( action = 'keydown' );
        
        keyCode = keymap[ key ];
        
        // if keyCode in not set because it don't exist in the 
        // keymap let's see if the user supplied a number
        // that we will assume that is the correct key code
        if( !keyCode && !isNaN(keyCode) ){
            keyCode = key;
        }
        
        if( action == 'keydown' ){
            keydown_callbacks[ keyCode ] || ( keydown_callbacks[ keyCode ] = [] );
            keydown_callbacks[ keyCode ].push( callback );
            pressed_keys[ keyCode ] = true;
            return;
        }
        
        if( action == 'keyup' ){
            keyup_callbacks[ keyCode ] || ( keyup_callbacks[ keyCode ] = [] );
            keyup_callbacks[ keyCode ].push( callback )
            pressed_keys[ keyCode ] = false;
            return;
        }
        
        asgard.log( 'Unknown event type: ' + action + ' for key ' + key );
    };
    
    // not so short shortcuts for key up
    input.onKeyUp = function(key,callback){
        input.on(key, callback, 'keyup' );
    }
    
    // not so short shortcuts for key down
    input.onKeyDown = function(key, callback){
        input.on(key, callback, 'keydown');
    }
    
    // key or list of keys to disable
    input.ignore = function(keys) {
        
    }
    
    input.isKeyPressed = function( key ){
        
        keyCode = keymap[ key ];
        
        // if keyCode in not set because it don't exist in the 
        // keymap let's see if the user supplied a number
        // that we will assume that is the correct key code
        if( !keyCode && !isNaN(keyCode) ){
            keyCode = key;
        }
        
        return pressed_keys[ keyCode ] === true;
        
    }
    
    // private function
    function handleKeyDown(e){
        e || ( e = window.event );
        var callback, callbacks = (keydown_callbacks[ e.keyCode ] || []);
        for( callback in callbacks ){
            callback.call(e);
            e.preventDefault();
        }
    }
    
    // private function
    function handleKeyUp(e){
        e || ( e = window.event );
        var callback, callbacks = (keyup_callbacks[ e.keyCode ] || []);
        for( callback in callbacks ){
            callback.call(e);
            e.preventDefault();
        }
    }
    
    // register the function handlers
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    
    return input;
    
    
})(asgard);