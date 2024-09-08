const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
  username: String,
  img:String
})


module.exports = mongoose.model('user', userSchema)