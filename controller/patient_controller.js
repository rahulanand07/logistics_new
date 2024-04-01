const test_api = async(req,res)=>{
    try {
        res.send({status:"true",message:"test message"})
    } catch (error) {
        console.log(error)
    }
}


export {
    test_api
}