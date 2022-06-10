const userRoute = require('../controllers/csv.controller')
module.exports = [
{
    method: 'POST',
    path: '/product/txt',
    handler: userRoute.createCsvFile
},

{
    method: 'POST',
    path: '/update/csv/database',
    handler:userRoute.updateCsvInDatabase,
    options: {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data',
            multipart: { output: "stream" },
        }
    }

},

]