import mongoose from "mongoose"

const patient_task_schema = new mongoose.Schema(
    {
        workType:{
            type:String,
            required:true
        },
        patientId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Patient",
            required:true
        },
        task:{
            type:Array
        },
        executionTime:{
            type:Date
        },
        taskStatus:{
            type:String,
            default:"OPEN"
        },
        assignedType:{
            type:String,
            default:null
        },
        taskPaymentStatus: {
            type: Boolean,
            default: false,
        },
        notes: {
            type: String,
            default: null,
        },
        assignedDate:{
            type:Date,
            default:null
        },
        logsiticId:{
            type:String,
            default:null,
        }, 
        startTime:{
            type:String,
            default:null
        },
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        postalCode: {
            type: String,
            trim: true
        }
             
    },
    { timestamps: true })


export default mongoose.model("Patient_task",patient_task_schema)