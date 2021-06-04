const mongoose = require("mongoose");

const hashtagsSchema = new mongoose.Schema({
    geek: [{
        type: String,
    }],
    technology: [{
        type: String,
    }],
    design: [{
        type: String,
    }],
    crypto: [{
        type: String,
    }],
    software: [{
        type: String,
    }],
    internet: [{
        type: String,
    }],
    computer: [{
        type: String,
    }],
    coding: [{
        type: String,
    }],
});

const Hashtags = mongoose.model("Hashtags", hashtagsSchema);

module.exports = Hashtags;