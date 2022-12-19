const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const UserSchema = new Schema({
    username: String,
    photoURL : String,
    uid : String,
    cart : Array
});





const User = mongoose.model("user", UserSchema);
module.exports = User;