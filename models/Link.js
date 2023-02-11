import mongoose from "mongoose";
const {Schema, model} = mongoose

const linkSchema = new Schema({
    longLink:{
        type: String,
        required: true,
        trim: true,
    },
    nanoLink: {
        type: String,
        required:true,
        trim: true,
        unique: true,
    },
    uid:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

export const Link = model('Link', linkSchema)