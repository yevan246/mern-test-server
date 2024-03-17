const {model, Schema} = require('mongoose')

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    text: { type: String, required: true},
    image: {type: String, default: null},

}, {timestamps: true, versionKey: false})

module.exports = model('post', postSchema)