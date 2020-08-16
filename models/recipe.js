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
        type:Array,
        required:true
    },
    difficulty : {
        type:String,
        required:true
    },
    ingredients : {
        type:Array,
        required:true
    },
    category : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    }
})

module.exports = Recipe = mongoose.model('Recipe',RecipeSchema)