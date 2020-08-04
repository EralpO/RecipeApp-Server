const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    brief : {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    difficulty : {
        type:String,
        required:true
    },
    ingredients : {
        type:Array[String],
        required:true
    }
})

module.exports = Recipe = mongoose.model('Recipe',RecipeSchema)