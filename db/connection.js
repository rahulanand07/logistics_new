import mongoose from "mongoose";

const DBURI = process.env.DBURI || "mongodb://localhost:27017/logistic_new"


const db_connect = ()=>{
    mongoose.connect(DBURI).then(()=>{
        console.log("mongodb connected!!")
    }).catch((error)=>{
        console.log(error)
    })
}


export default db_connect