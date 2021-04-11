const FRAME_INTERVAL = 1/60;

const AnimationFrame = function( x, y ) {
  this.x = x; this.y = y;
  this.script = null;
  this.objects = [ ];
}

const Animator = function( frame_interval = FRAME_INTERVAL ) {
  this.frame_interval = frame_interval
  this.animations = { };
}

Animator.setFrames = function( animation, index ) {

}

Animator.addAnimationFrame = function( name, frameIndex, properties ) {
  if( !this.animations[name] ) this.animations[name] = [ ];
  this.animations[name].push( frameIndex )
}


const GameObject = function( width, height, frameInterval = FRAME_INTERVAL ) {
  this.keyframes = [ ];
  this.width = width;
  this.height = height;
  this.animator = new Animator( frameInterval );
  this.src = null;
}

GameObject.prototype.setKeyFrames = function( width, height ) {
  let rows = height / this.height;
  let cols = width / this.width;
  while( this.keyframes.length > 0 ) this.keyframes.pop( );
  for( var i = 0; i < rows * cols; i++ ) {
    this.keyframes.push( new AnimationFrame((i % cols) * this.width, Math.floor( i / cols ) * this.height ))
  }
}

export { GameObject }
