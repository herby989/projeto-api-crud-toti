const mongoose = require('mongoose')

const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    telephone: Number,
    address: String,
    company: String,
    status: Boolean,
})
 
module.exports = Contact 