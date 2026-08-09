const mongoose = require('mongoose');
const { required } = require('yargs');
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    repositories: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],
    followedUser: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    starRepo: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],
})

const User = mongoose.model("User", UserSchema);

module.exports = User;