const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
        trim: true,
        required: true,
        minlength: 4,
        maxlength: 50,
        unique: true,
      },
      isActive:{
        type: Boolean , 
        default : true 
      }, 
      isDelete:{
        type: Boolean , 
        default: false 
      },
    
      
});

const Role = new mongoose.model("Role", roleSchema);
module.exports = Role;
