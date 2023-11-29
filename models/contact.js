const mongoose = require('mongoose')

const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    telephone: Number,
})

module.exports = Contact