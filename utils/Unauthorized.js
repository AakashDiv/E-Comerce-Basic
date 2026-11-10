const ApiError = require("./ApiError");

class Unauthorized extends ApiError{
    constructor(message){
          super(401, message)
    }
}

module.exports = Unauthorized