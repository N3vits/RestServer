import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const RoleSchema = Schema({
    role: {
        type: String,
        required: true
    }
});


export default model('Role', RoleSchema);