const express = require('express');
const app     = express();
const exphbs  = require('express-handlebars');
const Handlebars = require('handlebars');
const bp      = require('body-parser');
const path    = require('path');
const fsPromises = require('fs').promises;
const port    = process.env.port || 3000;

const hbs_config = {
  extname: '.hbs', defaultLayout: 'main',
}

app.engine('.hbs', exphbs(hbs_config));
app.set('view engine', '.hbs');
// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }))
// parse application/json
app.use(bp.json());
//static routes
app.use('/client', express.static(path.join(__dirname, "client")));
app.use('/jquery', express.static(path.join(__dirname,'node_modules/jquery/dist/jquery.js')))
//routes
app.get('/', (req,res,next)=>{ res.render('app') });

app.get('/prompt/:type', (req,res,next) => {
  fsPromises.readFile(path.join(__dirname, 'views/prompts/', req.params.type + '.hbs'), 'utf8')
  .then( data => {
    res.send( data );
  })
  .catch('Error encountered', 404);
});

const onServerListen = err => {
  if( err ) throw err;
  console.log(`Server Initialized, listening on port ${port}`);
}

app.listen( port, onServerListen );

//Methods
let precompile_handlebars = (source, content) => {
  let template = Handlebars.precompile( source );
  let compiled = template(content);
  console.log(compiled);
}
