const mysql = require("mysql2");

const db = mysql.createConnection({

    host:"localhost",

    user:"root",

    password:"root12345",

    database:"gekisia"

});

db.connect((err)=>{

    if(err){

        console.log(err);

    }else{

        console.log("MySQL Connected");

        db.query("SELECT DATABASE() AS db",(e,r)=>{

            console.log(r);

        });

    }

});

module.exports=db;