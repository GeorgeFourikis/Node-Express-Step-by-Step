const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName:     {
                type: String,
                required: [true, 'Email address is required']
                },
    lastName:  {
                type: String,
                required: 'Password is required',
                },
	  email:	{
		        type:String, required:true
			}
})


mongoose.model("Users", userSchema)
