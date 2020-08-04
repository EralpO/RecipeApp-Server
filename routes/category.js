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

router.get("/list",async (req,res)=>{
  try {
      let categoryList = await Category.find({})
      res.status(200).json(categoryList)
  } catch (error) {
      res.status(500).json({msg:"Server Error"})
  }
})

router.get("/find/:id",async (req,res)=>{
    try {
        let id = req.params.id
        let categoryName = await Category.find({_id:id})
        if(categoryName.length >0)
        res.status(200).json({categoryName})    
        else {
            res.status(400).json({msg:"Category name is not exist"})
        }
    } catch (error) {
        res.status(500).json({msg:"Server Error"})
    }
    


})

module.exports = router;