(function(){
    
    var self = this; // store the current scope
    
    // let's store this current function in case someone uses underscore
    var underscore = window._;
    
    
    // register asgard shortcut and asgard extension
    window._ = window.asgard = {};
    
    // asgard canvas width, height
    asgard.width = asgard.height = 0; 
    
    // returns this instance of asgard
    asgard.noConflict = function(){
        window._ = underscore;
        return asgard;
    }
    
    asgard.title = function() {
        var title = document.getElementsByTagName('title')[0];
        if( arguments.length == 1 ){
             title.innerHTML = arguments[0];
        }
        return title.innerHTML;
    }
    
    asgard.log = function(){
        console && console.log && console.log( arguments );
    }
    
    asgard.initialize = function(){
        
    }
    
    asgard.run = function(){
        // run the main game loop
    }
    
    asgard.pause = function(){
        // pause the game timer
    }
    
    asgard.close = function(){
        // stop the game timer and
    }
    
    
    return asgard; 
    
})();