const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    chosenAthletes: [{
        _id: false,
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type; String, required: true}
        Workouts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Athlete'}]
        schedule: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Athlete'}]
        diet: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Athlete'}]
    }],
    trainerId: { type: mongoose.Types.ObjectId, required: true, ref: 'Trainer'}
});

module.exports = mongoose.model('Member', orderSchema);