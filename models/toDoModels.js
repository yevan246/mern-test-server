const {Schema, model} = require ('mongoose')

const toDoSchema = new Schema ({
    text: { type: String, required: true},
    done: { type: Boolean, default: false},
    user: { type: Schema.Types.ObjectId, ref: 'user'}

}, {timestamps: true, versionKey: false})

module.exports = model('todo', toDoSchema)