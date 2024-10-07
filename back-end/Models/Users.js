const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    pass: {
        type: String,
    },
    userResources: [{
        date: String,
        amount: Number,
        name: String,
        remarks: String,
        category: String,
        mode: String,
        cashtype: String
    }
    ]
})
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;