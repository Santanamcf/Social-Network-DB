const { Schema, model } = require("mongoose");


const userSchema = new Schema(
    {
        username: {
            type: String,
            Unique: true,
            Required: true,
            Trimmed: true
        },
        email: {
            type: String,
            Required: true,
            Unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
        },

        thoughts: [
             {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ]

        
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
    
    


);

userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length 
    })

    const User = model('User', userSchema)

    module.exports = User;