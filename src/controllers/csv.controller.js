const { payload } = require("@hapi/hapi/lib/validation")
const userService = require("../services/csv.service") 

exports.createCsvFile = async(req,res,next) => {
    console.log(req.payload)
    const user = await userService.createCsvFile(req.payload)
    console.log(user)
    return res.response(user).code(200)
}

exports.updateCsvInDatabase = async(request,h) => {
    const data = request.payload;
    console.log("PAYLOAD",data.file)
    const response = await userService.updateCsvInDatabase(data)
    console.log(response)
    //const user = await userService.updateCsvInDatabase(response)
    //console.log(user)
    return h.response(response).code(200)
}

