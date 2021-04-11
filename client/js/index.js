import * as utils from '/client/js/utils.js';
import * as app from '/client/js/app.js';

window.loadReferenceImage = event => {
  let file = event.target.files[0];
  utils.readFile( file )
  .then(utils.loadImage)
  .then(app.setImage )
  .catch( onError );
}

window.updateCellDimensions = ( ) => {
  let width = parseInt($(':input[name=cellWidth]').val( ));
  let height = parseInt($(':input[name=cellHeight]').val( ));
  app.setCellSize( width, height );
}

const onError = data => {
  console.log('Error!', data);
}

app.initGui( );
