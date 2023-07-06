import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT

app.listen(PORT, (err)=>{
    if(err){
        console.error(err);
    }
    else{
        console.log(`Server Running On Port ${PORT}`);
    }
})