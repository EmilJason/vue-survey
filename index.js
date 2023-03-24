require('dotenv').config()
const mysql = require('mysql')
const express = require('express');
const cors = require('cors')



const PORT = process.env.PORT || 1995

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: false}))

const connection = mysql.createConnection(process.env.URI)

connection.connect(err=>{
    err ? console.log(err.message) : console.log('connnected');;
})

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  })

console.log(process.env.host);

app.get('/post',(req,res)=>{
    const query = 'SELECT * FROM surveytable'
    connection.query(query, (err, result)=>{
        err && console.log(err.message);
        res.send(result)
    })
})

app.get('/post/:name', (req,res)=>{
    let name = req.params.name
    let getByName = `SELECT * FROM surveytable WHERE name='${name}'`
    let result = connection.query(getByName,(err,result)=>{
        err && console.log(err.message);
        res.send(result)
    })
})
    
app.get('/add/:name/:question/:answer',(req,res)=>{
    console.log('Add called');
     try {
        let {name,question,answer}= req.params
        let data={name,question,answer}
        let insertQuery = `INSERT INTO surveytable SET ?`
        let query = connection.query(insertQuery,data,(err,result)=>{
            if(err) throw err.message
            console.log(result);
            res.send(query.values)
        })
     } catch (error) {
        console.log(error);
     } 
})

app.listen(PORT,()=>console.log('Listening to ' + PORT))


module.exports = app
