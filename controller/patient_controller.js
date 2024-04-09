import { ObjectId } from "mongoose";

const test_api = async(req,res)=>{
    try {
        res.send({status:"true",message:"test message"})
    } catch (error) {
        console.log(error)
    }
}

const get_patient_by_id = async(req,res) => {
    
    const param_id = req.params.id;
    if(!isValidObjectId(param_id)){
        res.statusCode = httpStatusCodes.BAD_REQUEST;
        return res.send(resp('ERR',"Id does not exists",''));
    }

}
export {
    test_api,
    get_patient_by_id
}