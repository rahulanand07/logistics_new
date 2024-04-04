import mongoose from "mongoose";

const slots_schema = new mongoose.Schema(
    {
      assignedDate: {
        type: Date,
        unique:true,
      },
      alotedTime:[
        {
          startTime:{
            type:String,
            default:null
          },
          slotStatus:{
            type:String,
            default:null
          },
          createdAt:{
            type:Date,
            default:Date.now
          },
        },
      ],
      assigneStatus:{
        type:String,
        default:null
      }
    },
    {timestamps: true}
);

export default mongoose.model('Slots_assigned',slots_schema)