const {model, Schema} = require('mongoose')

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: 'default.png'
    } 
}, {timestamps: true, versionKey: false})

module.exports = model('user', userSchema)