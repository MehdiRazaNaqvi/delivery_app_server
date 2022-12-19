const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const BrandSchema = new Schema({
    brand: String,
    password : String,
    pic : String,
    products : Array
  
  
});





const Brand = mongoose.model("brand", BrandSchema);
module.exports = Brand;