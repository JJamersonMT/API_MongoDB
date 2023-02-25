const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name:String,
    classe:String,
    subClasse:String
})

const Hero = mongoose.model('hero',heroSchema);

module.exports = Hero;