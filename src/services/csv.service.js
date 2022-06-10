const fs = require('fs');
const CSVToJSON = require("csvtojson")
let file_path = "../controllers/";
let file_name = "newfile.csv";
const Product = require('../models/csv.model')

exports.createCsvFile = async(decoded) => {
    try{               
            fs.writeFile(file_path + file_name,decoded, (err) => {
                if (err) return err;
            });
            return 'file saved'
        }
        catch (err){
            return err
        }
} 

exports.updateCsvInDatabase = async(data) => {
    if (data.file) {
        //writing payload file in the uploads folder
        const name = data.file.hapi.filename;
        const path = __dirname + "/uploads/" + name;
        const file = fs.createWriteStream(path);

        file.on('error', (err) => console.error(err));

        data.file.pipe(file);

        data.file.on('end', (err) => { 
            const ret = {
                filename: data.file.hapi.filename,
                headers: data.file.hapi.headers
            }
            console.log("READING DATA",ret);
        })
        /*
        let data1 = fs.readFileSync(path);
        const b = Buffer.from(data1)
        console.log(b.toString())
        */
       //converting CSV TO JSON
        const jsonArray=await CSVToJSON().fromFile(path)
        console.log(jsonArray)
        //Stringifying the json
        const value = JSON.stringify(jsonArray)
        let count = 0
        //using for loop to insert data from the array
        for ( var i = 0, length = jsonArray.length; i < length; i++ ){
            //checking whether the productId already exist
            const validate = await Product.query().findOne({productId:jsonArray[i].productId})
            if(validate){
                //counting the number of repeated values
                 count = count +1
            }
            else{
            const product = await Product.query().insert({
                productName:jsonArray[i].productName,
                description:jsonArray[i].description
            })
            }
        }
        //if whole data is repeated
        if(jsonArray.length==count) return "duplicate file"
        return 'file uploaded'
    }
    
   return "upload a file"
} 
