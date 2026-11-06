
const ApiError = require("./ApiError");

class Conflict extends ApiError{
    constructor(message){
           super(409, message)
           Error.captureStackTrace(this, this.constructor)
    }
} 

module.exports = Conflict