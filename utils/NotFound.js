const ApiError = require("./ApiError");

class NotFound extends ApiError{
    constructor(message){
           super(404, message)
    }
}

module.exports = NotFound