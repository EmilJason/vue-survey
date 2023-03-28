require('dotenv').config()
const mysql = require('mysql')
const express = require('express');
const cors = require('cors')



const PORT = process.env.PORT || 1995

const app = express()
app.use(cors({
    origin: ['http://localhost:5173','https://vue-survey.netlify.app','*'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


const connection = mysql.createConnection(process.env.URI)

connection.connect(err=>{
    err ? console.log(err.message) : console.log('connnected');;
})


console.log(process.env.host);

app.get('/post',(req,res)=>{
    
    const query = 'SELECT * FROM survey'
    connection.query(query, (err, result)=>{
        err && console.log(err.message);
        res.json(result)
    })
    
})

app.get('/post/:name', (req,res)=>{
    
    let name = req.params.name
    let getByName = `SELECT * FROM survey WHERE name='${name}'`
    let result = connection.query(getByName,(err,result)=>{
        err && console.log(err.message);
        res.send(result)
    })
   
})
    
// app.get('/add/:name/:question/:answer',(req,res)=>{
//     let {name, question, answer} = req.params
//     console.log('Add called');
//      try {
        
//         let insertQuery = `INSERT INTO survey (name, question, answer) VALUES ('${name}','${question}','${answer}')`
  
//         let query = connection.query(insertQuery,(err,result)=>{
//             if(err) throw err.message
//             console.log(result);
//             res.send(query.values)
//         })
//      } catch (error) {
//         console.log(error);
//      } 
    
// })

app.post('/add',(req,res)=>{
    let {name, data} = req.body
    console.log('Add called');
     try {
        
        let insertQuery = `INSERT INTO survey (name, data) VALUES ('${name}','${data}')`
  
        let query = connection.query(insertQuery,(err,result)=>{
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
