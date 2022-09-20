const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/Quora_clone");
const DB=mongoose.connection;
DB.on('error', err => {logError(err);});
DB.once('open',()=>{
    console.log("Succefully connected to DB");
})