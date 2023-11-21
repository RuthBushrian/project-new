require('dotenv').config();
const cors = require('cors');
const express = require("express");
const officerRouter=require("./routes/officer");
const fileRouter=require("./routes/file");
const documentRouter=require('./routes/document');
const dashRouter= require('./routes/dashboard');
const managerRouter = require('./routes/manager');
const stageRouter= require('./routes/stage')
const document_resultRouter= require('./routes/document_result')
const a = require('./routes/a')
const path = require('path')


const app=express();
app.use(cors());

app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb', extended: true}));

const PORT =process.env.PORT || 4321;

app.use(express.json());
app.use(express.urlencoded());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use("/officer", officerRouter);
app.use("/file", fileRouter);
app.use("/document", documentRouter);
app.use("/manager",managerRouter);
app.use("/dash",dashRouter);
app.use("/stage", stageRouter);
app.use("/result", document_resultRouter);
app.use("/a", a);



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) 
    {
        res.json({ message: '404 Not Found' })
    } 
    else
    {
        res.type('txt').send('404 Not Found')
    }
})
app.use(express.static(path.join('a', 'public')));



app.listen(PORT,()=>{
    console.log(`connected ${PORT}`);
})