const express = require('express')
const connectDB = require('./config/db')
const app = express();

//Connect Database

connectDB();

//Init bodyparser

app.use(express.json({extended:false}))

const port = process.env.PORT || 8080 ;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/api/recipe',require('./routes/recipe.js'))
app.use('/api/category',require('./routes/category.js'))


app.listen(port , ()=>{
    console.log(`Server started at ${port}`)
});

