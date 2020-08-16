const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const Recipe = require("../models/recipe")
const Category = require("../models/category");

router.get("/", (req, res) => {
  res.send("recipe geldi");
});

router.post(
  "/add",
  [
    check("name", "Name is required").not().isEmpty(),
    check("brief", "Brief is required").isLength({ min: 1 }),
    check("description", "Description is required").not().isEmpty(),
    check("difficulty","Difficulty is required").notEmpty(),
    check("ingredients","Ingredients is required").not().isEmpty()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    
    const {name,brief,difficulty,description,ingredients} = req.body
    try {
        let recipe = await Recipe.findOne({name})
        console.log(description)
        if(recipe){
            return res.status(400).json({ error:[{ msg:'Recipe already exist'  }] })
          }
         
        recipe = new Recipe({
            name,
            brief,
            difficulty,
            description,
            ingredients
        })
        recipe.category = req.body.categoryId
        console.log(recipe)
        await recipe.save();
        res.status(201).json({msg:'Recipe created successfully'})
    } catch (error) {
        res.status(500).json({msg:"Server Error"})
    }
    
  }
);

module.exports = router;
