const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/geek-circle', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    returnOriginal:false
})

mongoose.connection
.once("open", ()=>console.log("connected"))
.on("error", error=>{
    console.log("err",error); 
})