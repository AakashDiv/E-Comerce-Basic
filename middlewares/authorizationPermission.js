
const Unauthorized = require("../utils/Unauthorized")
const Forbidden  = require("../utils/Forbidden")

const authorizationPermission = (...roles)=>{
       return (req, res, next)=>{
             if(!req.user){
                    return next(new Unauthorized("Please login"))
             }

             if(!roles.includes(req.user.role)){
                     return next(new Forbidden("You do not have permission to access this resource"));
             }

             next();
       }
}

module.exports = authorizationPermission