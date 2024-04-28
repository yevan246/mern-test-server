const {model, Schema} = require('mongoose')

const likesShema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true},
    post: { type: Schema.Types.ObjectId, ref: 'post', required: true}
}, {versionKey: false})

module.exports = model('postLikes', likesShema)