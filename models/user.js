import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    refresh_token: String,
    artists: [{ name: String, id: String}],
    date: { type: Date, default: Date.now }
})

const model = mongoose.model('User', userSchema);
export default model;