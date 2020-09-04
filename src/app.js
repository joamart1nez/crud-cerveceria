const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 4000);
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended:false}));


//routes
app.use('/', indexRoutes);

app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});