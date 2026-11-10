const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken")


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role:{
      type:String,
      enum: ["customer", "vendor", "admin"],
      default:"customer"
    }
  },
  { timestamps: true },
);


userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
       try {
            const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
         next()
       } catch (error) {
        next(error)
       }
})

userSchema.methods.comparePassword = async function(userPassword){
      return await bcrypt.compare(userPassword, this.password);
}



const users = mongoose.model("Users", userSchema);
module.exports = users;
