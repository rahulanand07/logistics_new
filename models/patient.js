import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        index: true
    },
    patient_id: {
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
    mobile_number: {
        type: String,
    },
    occupation: {
        type: String,
        trim: true,
    },
    profile_picture: {
        type: String,
        default:null
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
    prescription_type: {
        type: String,
        default: "OPD",
      },
      priority:{
        type:String,
        default:null
      },
      payment_status: {
        type: String,
      },
},
    {
        timestamps: true,
    }
)


export default mongoose.model('Patient', patientSchema);
