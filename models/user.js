const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema= new Schema(
    {
        name : {type:String},
        username : {type:String},
        password : {type:String},
        DoB : {type:Date},
        Mobile : {type:Number}
    }
);
module.exports=mongoose.model("user",userSchema);