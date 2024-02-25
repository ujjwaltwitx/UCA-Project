const express = require("express");
const { default: mongoose } = require("mongoose");
const TutorModel = require("../models/tutor");
const ContactModel = require("../models/contact");
const GroupModel = require("../models/group");
const router = express.Router();


router.get("/view", async (req, res) => {
    const data = await TutorModel.find().populate("contactId")
    if(data.count == 0){
        return res.status(400).send({
            "message" : "No Tutors present",
        })
    }
    return res.status(200).json(data)
})

router.get("/view/:id", async (req, res)=>{
    try{
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.send({
                "message" : "objectid not valid",
            })
        }

        const result = TutorModel.findById(id)

        if(result.count == 0){
            return res.status(400).send({
                "message" : "Object id not found"
            })
        }

        res.status(200).json(result)
    }catch(error){
        res.status(500).send({
            "message" : "Internal server errror",
            data : error
        })
    }
})


router.post("/save", async (req, res)=>{
    try{
        const data = req.body
        if(!data || !data.salary || !data.joiningDate){
            return res.status(400).send({
                "message" : "Object parameters not valid",
            })
        }
        const contactData = {
            "addressStreet" : data.addressStreet,
            "pinCode" : data.pinCode,
            "phone" : data.phone,
            "email" : data.email,
        }

        const contactInsatance = new ContactModel(contactData)
        await contactInsatance.save();
        const tutorData = {
            "name" : data.name,
            "salary" : data.salary,
            "joiningDate" : data.joiningDate,
            "docs" : data.docs,
            "groups" : data.groups,
            "contactId" : contactInsatance._id
        }
        console.log(data)
        const tutorInstance  = new TutorModel(tutorData)
        await tutorInstance.save()
        console.log(tutorInstance)
        data.groups.forEach(async element => {
            console.log(element)
            await GroupModel.updateOne(
                { _id: element },
                { $push: { tutors: tutorInstance._id } },
              );
        });
        res.status(200).send({
            "message" : "Data saved successfully"
        })
    }catch(error){
        res.status(500).send({
            "message" : "Internal server error",
            data : error
        })
    }
})

router.delete("/delete/:id", async (req, res)=>{
    try{
        const id  = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({
                "message" : "ObjectId not valid"
            })
        }

        const result = TutorModel.findByIdAndDelete(id)
        if(result.count == 0){
            return res.status(400).send({
                "message" : "No object with particular id found"
            })
        }

        return res.status(200).send({
            "message" : "Record deleted successfully"
        })
    }catch(error){
        return res.status(500).send({
            "message" : "Internal server error",
        })
    }
})


router.patch("/update/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).send({
                "message": "Invalid objectId format"
            })
            return
        }

        const result = TutorModel.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        if (!result) {
            return res.status(400).send({
                "message": "Group Not found"
            })
        }

        return res.status(200).send({
            "message": "record update successfully",
            data: result
        })
    } catch (error) {
        res.status(500).send({
            "message": "Internal server error"
        })
    }
})

module.exports = router

