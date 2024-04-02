import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        index: true
    },
    patientId: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    age: {
        type: Number,
    },
    dob: {
        type: Date,
        trim: true,
    },
    gender:{
        type: String,
        enum:["male","female"],
        default:null
    },
    mobileNumber: {
        type: String,
    },
    occupation: {
        type: String,
        trim: true,
    },
    addresses: [
        {
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
        }
    ],
    prescriptionType: {
        type: String,
        default: "OPD",
      },
      priority:{
        type:String,
        default:null
      },
      paymentStatus: {
        type: String,
      },
},
    {
        timestamps: true,
    }
)


export default mongoose.model('Patient', patientSchema);
