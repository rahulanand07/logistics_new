import express from "express"
import cors from "cors"
import {router as patient} from "./router/patient_router.js"
import {router as user} from "./router/user_router.js"
import db_connect from "./db/connection.js"

const app = express()
app.use(express.json())


app.use(cors({
    origin:"http://localhost:3000",
    methods: "GET,POST,PUT,DELETE" 
}))

app.get("/",(req,res)=>{
    return res.send({
        status: "true",
        message: "welcome to logistics-backend"
    })
})


//DB Connect
db_connect()


//Route imports
app.use("/api/v1/patient",patient)
app.use("/api/v1/user",user)


export default app