import * as ObjectLibrary from '/client/js/Object.js'

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

var gui = {
  zoom: 1,
  rows: 0, cols: 0,
  currentFrame: null,
  tool: null,
  toolIsActive: false,
  startPos: null,
  endPos: null,
  svg: $('#editor_svg')[0],
  drawFrame: function( frame ) {
    let ctx = $('#editor')[0].getContext('2d');
    ctx.clearRect( 0, 0, project.object.width, project.object.height );
    ctx.drawImage( project.image, frame.x, frame.y, project.object.width, project.object.height, 0, 0, project.object.width, project.object.height );
  },
  createSVGElement : function( type, attributes = null ) {
    let element = document.createElementNS( SVG_NAMESPACE, type );
    if( attributes );
    for( var _property in attributes ) {
      element.setAttributeNS( SVG_NAMESPACE, _property,  attributes[_property]);
    }
  },
  loadFrame: function( frame ) {
    this.currentFrame = frame;
    this.drawFrame( frame );
    this.updateFrameDetail( frame );
    this.loadFameBoxes( frame );
  },
  onMouseDown: function( event ) {
    this.startPos = getRelativePoint($('#editor')[0], event.clientX, event.clientY );
    this.endPos = this.startPos;
    this.toolIsActive = true;
    this.toolStart( );
  },
  onMouseMove: function( event ) {
    this.endPos = getRelativePoint($('#editor')[0], event.clientX, event.clientY );
    this.toolUpdate( );
  },
  onMouseUp: function( event ) {
    this.endPos = getRelativePoint($('#editor')[0], event.clientX, event.clientY );
    this.toolIsActive = false;
    this.toolEnd( );
  },
  selectTool: function( event ) {
    this.tool = $('.tool_selection h2').index( event.target );
  },
  svgDrawBox: function( x, y ,width, height, color = "black", id: null ) {
    let rect = this.createSVGElement('rect', {x:x, y:y, width: width, height:height, fill: color, id: id });
    svg.appendChild( rect )
  },
  toolStart: function(  ) {
    if( tool.type == 'rect' ) {

    }
  },
  toolUpdate: function(  ) {

  },
  toolEnd: function(  ) {
    this.drawSVGBOX( );
  },
  updateFrameDetail: function( frame ) {
    $('#frame_index').html(project.object.keyframes.indexOf( frame ));
    $('#frame_interval').html( parseInt(project.object.animator.frame_interval * 1000) + 'ms'  );
    $('#frame_coordinates').html(`{${frame.x}, ${frame.y}, ${project.object.width}, ${project.object.height}}`);
  }
}

var project = {
  name: null,
  image: null,
  object: new ObjectLibrary.GameObject(100, 100)
}

const setImage = image => {
  project.image = image;
  let cx = createCanvasFromIamge(image);
  $('#keyframes').append( cx.canvas );
  sliceToKeyFrames( );
}

const setCellSize = ( width, height ) => {
  project.object.width = width;
  project.object.height = height;
  updateEditor( );
  sliceToKeyFrames( );
}

const updateEditor = ( ) => {
  let canvas = $('#editor')[0];
  let svg    = $('#editor_svg')[0];
  if(project.object.width != 0 && !isNaN(project.object.width)) canvas.width = gui.zoom * project.object.width;
  if(project.object.height != 0  && !isNaN(project.object.height)) canvas.height = gui.zoom * project.object.height;
}

const selectCell = event => {
  let point = getRelativePoint( event.target, event.clientX, event.clientY );
  let index = convertToIndex( point.x, point.y );
  let frame = project.object.keyframes[ index ];
  gui.loadFrame( frame );
}

const createCanvasFromIamge = image => {
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage( image, 0, 0 );
  return { canvas: canvas, ctx: ctx }
}

const sliceToKeyFrames = ( ) => {
  let canvas = $('#keyframes canvas')[0];
  if(!canvas) return;
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.getContext('2d').drawImage(project.image, 0, 0 );
  drawGrid( canvas, project.object.width, project.object.height );
  project.object.setKeyFrames( canvas.width, canvas.height );
}

const drawGrid = (canvas, width, height) => {
  if( width <= 0 || height <= 0 || !canvas ) return;
  let ctx = canvas.getContext('2d');
  ctx.beginPath( );
  ctx.strokeStyle = '#000';
  ctx.setLineDash([4, 2]);
  for( var i = 0; i < canvas.width/width; i++ ) {
    ctx.moveTo( i* width, 0 );
    ctx.lineTo( i * width, canvas.height );
  }
  project.cols = i;
  for( i = 0; i < canvas.height/height; i++ ) {
    ctx.moveTo( 0, i * height );
    ctx.lineTo( canvas.width, i * height );
  }
  project.rows = i;
  project.object.setKeyFrames(canvas.width, canvas.height);
  ctx.stroke( );
  ctx.closePath( );
  canvas.addEventListener('click', selectCell )
}

const getRelativePoint = ( element, x, y ) => {
  let rect = element.getBoundingClientRect( );
  return { x: x - rect.x, y: y - rect.y };
}

const convertToIndex = (x, y) => {
  let row = Math.floor( y / project.object.height );
  let col = Math.floor( x / project.object.width );
  return row * project.cols + col;
}

const initGui = ( ) => {
  $('.tool_selection h2').click( gui.selectTool );
  $('#editor')[0].addEventListener('mousedown', gui.onMouseDown);
  $('#editor')[0].addEventListener('mousemove', gui.onMouseMove);
  $('#editor')[0].addEventListener('mouseup', gui.onMouseUp);
}

export { setImage, setCellSize, initGui }
