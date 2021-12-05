const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const athleteSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
    Workouts: [{ type: mongoose.Types.ObjectId, required: true]
    schedule: [{ type: mongoose.Types.ObjectId, required: true]
    diet: [{ type: mongoose.Types.ObjectId, required: true]
});

module.exports = mongoose.model('Athlete', toppingSchema);