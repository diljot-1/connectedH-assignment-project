const connection=require("../connect");
const {Schema}=require("mongoose");

const ProductSchema=new Schema({
    oid:{type:Schema.Types.String, required:true},
    name:{type:Schema.Types.String, required:true, min:8, max:20} ,
    price:{type:Schema.Types.Number, required:true},
    imageUrl:{type:Schema.Types.String, required:true}
},{timestamps:true})

const ProductModel =connection.model('products', ProductSchema);
module.exports = ProductModel;