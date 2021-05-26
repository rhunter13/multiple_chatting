var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 
var http = require("http").Server(app);
var io = require("socket.io")(http)
<<<<<<< HEAD
const  stringify  = require("querystring");
var sql = require("mysql");
var path=require("path");
var {Pool,Client} = require("pg");
var url = require("url");
=======
var mongoose = require("mongoose");
const { stringify } = require("querystring");
var sql = require("mysql");
>>>>>>> 921e80e9b6eb59fb0c2f525ed16e0a091e5ed2ca

var conn = sql.createConnection({
    host : "localhost",
    user : "venkat",
    password : "krishna13",
    database : "chat"
});

<<<<<<< HEAD
/*var conn = new Client({
    user : "venkat",
    host : "localhost",
    database : "chat",
    password : "krishna13",
    port : 5432
});*/

=======
>>>>>>> 921e80e9b6eb59fb0c2f525ed16e0a091e5ed2ca
conn.connect(err => {
    if(err) throw err;
    //console.log("connet mysql");
});

<<<<<<< HEAD

//conn[database1].query("create table [if not exists] messages(name varchar(50), message varchar(2000))");

app.set('view engine', 'ejs');
//app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) => {
    res.render("login", {email_check:0,password_check:0});
});

app.post("/", (req,res)=>{
    let email = req.body.email;
    let pass = req.body.password;

    let query = "select first_name,last_name,password from user_data where email="+'"'+email+'"';
    console.log(query);
    conn.query(query, (err,result)=>{
        console.log(result);
        if(result.length==0)
        res.render("login", {email_check:1,password_check:0});
        else if(pass!=result[0].password)
        res.render("login", {password_check:1,email_check:0});
        else{
            let name = result[0].first_name+"_"+result[0].last_name;
            let s = stringify.stringify({username:name});
            res.redirect("/index/?"+s);
        }
    });
    //res.render("index");
});

app.get("/register", (req,res)=>{
    res.render("register", {email_check:0,password_check:0});
});

app.post("/register", (req,res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let phone = req.body.number;

    let query = "select email,password from user_data where email="+'"'+email+'"';
    conn.query(query,(err,result)=>{
        if(result.length>0)
        res.render("register",{email_check:1,password_check:0});
        else if(password!=cpassword)
        res.render("register",{email_check:0,password_check:1});
        let q=`insert into user_data values("${fname})","${lname}","${email}","${password}","${phone}")`;
        //console.log(q);
        conn.query(q,(err,result)=>{
            if(err)
            console.log(err);

        res.redirect("/");
        });
    });
    //res.redirect("/");
});

app.get("/index", (req,res)=>{
    let name = req.query.username;
    //console.log(name);
    res.render("index",{name:name});
});
=======
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended:false}))


var Message = mongoose.model('Message', {
    name : String,
    message : String
});

var messages = [{name:"venkat", message:"hai"}];
>>>>>>> 921e80e9b6eb59fb0c2f525ed16e0a091e5ed2ca

app.get('/messages', (req,res) => {
    let query = "select * from messages";
    conn.query(query, (err,result)=>{
        //console.log(result);
        res.send(result);
    })
});

app.post('/messages', (req, res) => {
<<<<<<< HEAD
    console.log(req.body.name);
=======
>>>>>>> 921e80e9b6eb59fb0c2f525ed16e0a091e5ed2ca
    let query = "insert into messages values('"+req.body.name+"','"+req.body.message+"')";
    conn.query(query, (err,result)=>{
        if(err)
            throw error;
        //console.log(result);
        io.emit('message', req.body);
        res.sendStatus(200);
    });

})

io.on('connection', ()=> {
    //console.log("connected");
});


http.listen(3000);
