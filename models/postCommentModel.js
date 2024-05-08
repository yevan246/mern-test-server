const {model, Schema} = require('mongoose')

const comentsSchema = new Schema({
    text: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true}
}, {versionKey: false})

module.exports = model('postComment', comentsSchema)