const readFile = ( file ) => {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader( );
    reader.onload = event => { resolve( event.target.result );}
    reader.onerror = event => { reject( event );}
    if( file.type.match('image*')) reader.readAsDataURL( file );
  });
}

const loadImage = url => {
  return new Promise(function(resolve, reject) {
    let image = new Image( );
    image.onload = event => { resolve( image )}
    image.onerror = event => { reject( event ) }
    image.src = url;
  });
}

export { readFile, loadImage }
