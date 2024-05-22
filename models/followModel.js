const {model, Schema} = require('mongoose')

const followSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {versionKey: false})

module.exports = model('follow', followSchema)
