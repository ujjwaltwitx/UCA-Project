const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const DocModel = require("../models/doc.js");
const authenticateRequest = require("../utils.js");

router.get("/doc/:id", authenticateRequest, async (req, res)=>{
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const result = DocModel.findById(id)
            if(result.count == 0){
                return res.status(400).send({
                    "message" : "Invalid object id"
                })
            }
            return res.json(result)
        }
    }catch(error){
        return res.status(500).send({
            "message" : "Internal server error"
        })
    }
})

router.post("/save", authenticateRequest, async (req, res)=>{
    try{
        const data = req.body
        const model = new DocModel(data)
        if(!data || !data.entityId || !data.link || !data.size){
            return res.send({
                "message" : "Invalid data"
            })
        }
        model.save()
        return res.status(200).send({
            "message" : "object saved successfully",
            data : model,
        })

    } catch (error){
        res.status(500).send({
            "message" : "Internal Server Error",
        })
    }
})

router.delete("/delete/:id", authenticateRequest, async (req, res)=>{
    try{
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.send({
                "message" : "invalid object id"
            })
        }
        const result = DocModel.deleteOne(_id = id)
        if(result.count == 0){
            res.status(400).send({
                "message" : "ObjectId not found"
            })
        }
        res.status(200).send({
            "message" : "Object Successfully deleted",
        })
    }catch(error){
        res.send({
            "message" : error
        })
    }
})