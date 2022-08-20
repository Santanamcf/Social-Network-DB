const { Schema, model, Types } = require("mongoose");
const moment = require("moment")

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            Required: true,
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY[at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [{
            reactionSchema
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY[at] hh:mm a')
    },
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
)

thoughtsSchema.virtual("reactionCount")
.get(function(){
    return this.reactions.length
});

const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts;