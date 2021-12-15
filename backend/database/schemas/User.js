const connection=require("../connect");
const {Schema}=require("mongoose");

const UserSchema=new Schema({
    mail:{type:Schema.Types.String, required:true},
    password:{type:Schema.Types.String, required:true, min:8, max:20},
    name:{type:Schema.Types.String, required:true},
    dob:{type:Schema.Types.String, required:true},
    mobile:{type:Schema.Types.String, required:true},
    oid:{type:Schema.Types.ObjectId, required:true}
},{timestamps:true})

const UserModel =connection.model('users', UserSchema);
module.exports = UserModel;