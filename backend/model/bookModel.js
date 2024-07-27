import mongoose from "mongoose";

const bookSchema =new  mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publishYear:{
        type:String,
        require:true
    },
},
{
    timestamps:true
});

export const Book = new mongoose.model('Book',bookSchema);