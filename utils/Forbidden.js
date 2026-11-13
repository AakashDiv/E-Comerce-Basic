const ApiError = require("./ApiError");

class Forbidden extends ApiError{
    constructor(message){
          super(403, message)
        
    }
}

module.exports = Forbidden