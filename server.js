const express = require('express')
const connectDB = require('./config/db')
const app = express();

//Connect Database

connectDB();

//Init bodyparser

app.use(express.json({extended:false}))

const port = process.env.PORT || 8080 ;


app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/api/category',require('./routes/category.js'))


app.listen(port , ()=>{
    console.log(`Server started at ${port}`)
});