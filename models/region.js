import mongoose from "mongoose";

const regionSchema = new mongoose.Schema({
    region: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    diagnostics: {
        type: String,
        enum: ["RADIOLOGY", "BLOOD TEST", "DRUGS"]
    },
    ownership: {
        type: String
    },
    specialization: {
        type: String
    },
    loc: [
        {
            lat: {
                type: String,
                trim: true
            },
            lon: {
                type: String,
                trim: true
            }
        }
    ]
})


export default mongoose.model("Region", regionSchema)