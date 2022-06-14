const express = require("express")
const User = require("../models/user")
const router = express.Router()

router.post("/signup", async (req, res) => {
    let user = new User(req.body)
    try {
        user = await user.save()
        if(!user) return res.send({message: "Error while creating user"})
        res.json(user)
    } catch (e) {
        res.send({message: "Internal server error", error: e})
    }
})

router.put("/edit:id", async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findOne({_id: id})
        if(!user) return res.status(404).send({ message: `User not found`})
        user = req.body;
        user.save()
        res.send({ message: "Updated successfully", user})
    } catch (e) {
        res.send({message: "Internal server error", error: e})
    }
})

router.delete("/delete:id", async(req, res) => {
    let id = req.params.id
    try {
        const user = await User.deleteOne({_id: id})
        if(!user) return res.send({message: "User not found"})
        res.status(200).send("Deleted successfully")
    } catch(e) {
        res.send({message: "Internal error while deleting user"})
    }

})

router.get("/all", async(req, res) => {
    try{
        const user = await User.find()
        if(!user) return res.send({ message: "Users not found" })
        res.send(user)
    } catch(e) {
        res.send({ message: "Internal error"})
    }
})

module.exports = router;