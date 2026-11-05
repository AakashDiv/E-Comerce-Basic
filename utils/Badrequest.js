
const ApiError = require('./ApiError');

class Badrequest extends ApiError {
    constructor(statusCode, message){
          super(400, message);
    }
}

module.exports = Badrequest