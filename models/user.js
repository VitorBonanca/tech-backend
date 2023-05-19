const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {     
   type: String,    
   default: "Manaus",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  homes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home"
    }
  ]
});

const User = mongoose.model("User", UserSchema);


UserSchema.methods.addHome = async function (homeId) {
  this.homes.push(homeId);
  await this.save();
};


module.exports = User;