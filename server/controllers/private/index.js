import express from "express";

import blogModel from "../../models/Blog/Blogs.js";


const router = express.Router();

router.post("/writeblog",async(req,res) => { 
    try {
        let {blogBody,blogName} = req.body;
        // console.log(user);
        let blog = {
            blogBody,
            blogName,
            userId : req.user._id
        }
        await blogModel.insertOne(blog)
        res.status(200).json({ msg: "blog created"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

router.get("/allblogs/:id",async(req,res) => {
    try {
        let id = req.params.id;
        let blogs = await blogModel.findById(id)

        res.status(200).json({blogs})
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error})
    }
});
export default router
