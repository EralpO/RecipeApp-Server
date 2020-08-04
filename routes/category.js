const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");

const Category = require("../models/category");
const category = require("../models/category");

router.get("/",(req,res)=>{
    res.send("category geldi")
})

router.post("/add",[ check(
    "categoryName",
    "Please enter a category name"
  ).exists(),
],async (req,res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    else{
        let categoryName = req.body.categoryName
        try {
            let category = await Category.findOne({categoryName})
            if(category){
            return res.status(400).json({ error:{ msg:'User already exist'  } })
            }
            category = new Category({
                categoryName
            })
            await category.save()
            res.status(201).json({msg:'User created successfully'})
        } catch (error) {
            
        }
    }
})

module.exports = router;