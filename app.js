const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const metersRoutes = require('./api/routes/meters');

//mongoose.connect("mongodb+srv://mondli0815:"+
//process.env.MONGO_ATLAS_PW +
//"@cluster0.iwlck.mongodb.net/TestDB?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });



const uri = "mongodb+srv://mondli0815:"+
process.env.MONGO_ATLAS_PW +
"@cluster0.iwlck.mongodb.net/MyTestDB?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected…")
})
.catch(err => console.log(err))


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS ERRORS HANDLING
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Conrol-Allow-Headers",
        "Origin-X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/api/meters', metersRoutes);

app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 400;
    next(error);
    
});
app.use((error, req,res,next) =>{
   res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
    
});
module.exports = app;