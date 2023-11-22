import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    img: {
        type: String,
    },

    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },

    status: {
        type: Boolean,
        default: true,
    },

    google: {
        type: Boolean,
        default: false,
    },
});
userSchema.methods.toJSON = function() {
    const {__v, password, _id, ...users} = this.toObject();
    users.uid = _id;
    return users;
}
export default model('User', userSchema);
