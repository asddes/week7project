const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    assign: {
        type: mongoose.Types.ObjectId,
        ref: "Developer"
    },
    due: Date,
    status: {
        type: String,
        validate: {
            validator: function(statusValue) {
                return statusValue == "In Progress" || statusValue == "Complete";
            },
            message: "Status Should be InProgress or Complete."
        }
    },
    description: String
});

module.exports = mongoose.model("Task",taskSchema);