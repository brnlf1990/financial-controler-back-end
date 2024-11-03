const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema({
    date:{
        type: Date,
        minlenght:2,
        maxlenght:30
    },
    description:{
        type: String,
        minlenght:2,
        maxlenght:30
    },
    category:{
        type: String,
        required: true,

    },
    value:{
        type: Number,
        required: true,

    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: __dirname,
        required: true,
    }

})

module.exports = mongoose.model("revenue", revenueSchema);