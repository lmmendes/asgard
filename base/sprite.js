var Sprite = function(options){
    var self = this;
    
    this.src = null;
    this.x = 0;
    this.y = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.frames = 0;
    this.currentFrame = 0;
    this.width  = 0;
    this.height = 0;
    this.duration = 1;
    this.isReady = false;

    var d=new Date();
    if( this.duration > 0 && this.frames > 0 ){
      this.ftime = d.getTime() + (this.duration / this.frames);
    }else{
      this.ftime = 0;
    }
    
    return this;
}

Strite.prototype.setSpritesheet = function(src){
  if( src instanceof Image ){
    this.spritesheet = src;
  }else{
    this.spritesheet = new Image();
    this.stritesheet.src = src;
  }
  return this;
}

Sprite.prototype.setPosition(x,y){
  this.x = x;
  this.y = y;
  return this;
}

Sprite.prototype.setOffset = function(x,y){
  this.offsetX = x;
  this.offsetY = y;
  return this;
}

Sprite.prototype.setFrames(frames){
  this.currentFrame=0;
  this.frames = frames;
  return this;
}

Sprite.prototype.setDuration(duration){
  this.duration = duration;
  return this;
}

Sprite.prototype.getOffset = function(){
  return { "x": this.offsetX, "y": this.offsetY };
}


Sprite.prototype.getOffsetX = function(){
  return this.offsetX;
}

Sprite.prototype.getOffsetY = function(){
  return this.offsetY;
}

Sprite.prototype.draw = function(c){
  this.isReady && c.drawImage(this.spritesheet,
              this.offsetX,
              this.offsetY,
              this.width,
              this.height,
              this.x,
              this.y,
              this.width,
              this.height);
}

Sprite.prototype.animate = function(c,t){
  if( t.getMilliseconds() > this.ftime ){
    this.nextFrame();
  }
  this.draw(c);
}

Sprite.prototype.nextFrame = function(){
    if( this.duration == 0 ){
      return;
    }
    
    if( this.duration > 0 && this.frames > 0 ){
      var d = new Date();
      this.ftime = d.getTime() + (this.duration / this.frames);
    }else{
      this.ftime = 0;
    }

    this.offsetX = this.width * this.currentFrame;

    if( this.currentFrame == ( this.frames - 1 ) ){
      this.currentFrame = 0;
    } else {
      this.currentFrame++;
    }

}
