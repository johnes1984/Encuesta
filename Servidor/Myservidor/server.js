var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser     =        require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

var client = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventarios',
});

//client.database = 'Inventarios';

client.connect();


 client.query('select * from groups ',
              function (err, results, fields) 
              {
     if(err)
     {
         client.end();
         throw err;
     }
     else
     {
       console.log(results);   
     }
               
     
              });

app.get('/',function(req,resp) {
    
    client.query('select * from groups',function(err,rows,fields){
    
        console.log('correcto');
        console.log(rows[0].usuario);
        //resp.send('hola     ' + rows[0].usuario );
        resp.json(rows);
    });
});

app.post('/userlogin', function(sReq, sRes){    
    var email = sReq.body.email;
    console.log(email)
 sRes.end("yes");
  
});









app.listen(3333);
