const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

const app = express();
app.use(bodyParser.json());

db.pool.query('CREATE TABLE lists (id INTEGER AUTO_INCREMENT, value Text, PRIMARY KEY (id))', function(err, result, fileds){
    console.log('result', result);
});

app.get('/api/values', function(req,res){
    db.pool.query('SELECT * FROM lists;', function(err, result, fileds){
        if(err)
            return res.status(500).send(err);
        else
            return res.json(result);
    });
})

app.post('/api/value', function(req, res){
    db.pool.query('INSERT INTO lists (value) VALUES(?)',[req.body.value], function(err, result){
        if(err)
            return res.status(500).send(err);
        else
            return res.json({success: true, value: req.body.value});
    })
})

app.listen(5000, function(){
    console.log("server start on port 5000");
})