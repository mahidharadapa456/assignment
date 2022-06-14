const express = require("express")
const router = express.Router();
const Post = require("../models/post")

router.post("/new", async(req, res) => {
    let post = new Post(req.body)
    try {
        post = await post.save()
        if(!post) return res.send({message: "Error while creating post"})
        res.send({message: "Successfully created post", post})
    } catch (e) {
        res.send({message: "Internal error", error: e})
    }
})

router.put("/edit:id", async(req, res) => {
    let _id = req.params.id;
    try {
        const post = await Post.findOneAndUpdate(_id, req.body)
        if(!post) return res.send({ message: "Error while updating post"})
        res.send({message: "Successfully updated post", post})
    } catch(e) {
        res.send(e)
    }
})

router.delete("/delete:id", async(req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.deleteOne(_id)
        if(!post) return res.send({message: "Post not found"})
        res.send({message: "Deleted successfully"})
    } catch(e) {
        res.send({ message: "Internal server error"})
    }
})

router.get("/all", async(req, res) => {
    try {
        const post = await Post.find()
        if(!post) return res.send("Post not found")
        res.send({message: "Posts found", post})
    } catch (e) {
        res.send({message: "internal error", error: e})
    }
})

module.exports = router;