const mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            require: true
        },
        lastName: String
    },
    level: {
        type: String,
        require: true,
        validate: {
            validator: function(levelValue) {
                return levelValue == "Beginner" || levelValue == "Expert";
            },
            message: "Level Should be Beginner or Expert."
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String,
    }
});

module.exports = mongoose.model("Developer",developerSchema);