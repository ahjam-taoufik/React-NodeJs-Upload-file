const express = require('express')
const  path  = require("path")
const multer= require('multer')

const app=express()

const fileStorageEngine =multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./images")
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"--"+ file.originalname)
    }
})
const upload=multer({storage:fileStorageEngine})

//const upload=multer({dest:'/images'})


app.get('/',function(req,res){
    res.send('salam alikoum')
})

app.get("/index",(req,res)=>{
    
    res.sendFile(path.join(__dirname,"index.html"))
})


app.post("/single",upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send("Single file upload")
})

app.post("/multiple",upload.array("images",2),(req,res)=>{
    console.log(req.file);
    res.send("multiple file upload")
})



app.listen(5500,()=>{
    console.log('lestining');
})

