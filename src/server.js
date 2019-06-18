const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mysql = require('mysql'), // node-mysql module
      myConnection = require('express-myconnection'), // express-myconnection module
      dbOptions = {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'dbfactpro'
};

const app = express();

// config
var user = require('./routes/api');

app.set('port', process.env.PORT || 5000); 

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(myConnection(mysql, dbOptions, 'single'));

// Router
app.use('/api', user);

// Output
app.listen(app.get('port'), (req, res)=>{
    console.log(`Init Server in ${app.get('port')}`);
});
