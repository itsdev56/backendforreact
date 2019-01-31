var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');

cors=require('cors');
const route=require('./route/index')
var app=express();

app.use(cors());
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

//app.set('view engine','ejs');
//app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(route);

app.listen(server_port, server_ip_address, function () {
   console.log( "Listening on " + server_ip_address + ", port " + server_port )
 });



