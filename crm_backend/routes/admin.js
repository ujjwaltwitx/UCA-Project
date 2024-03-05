const express = require("express");
const bcrypt = require('bcrypt')
const router = express.Router();
const dotenv = require('dotenv')
const AdminModel = require("../models/admin.js");
const StudentModel = require("../models/student.js");
const jwt = require('jsonwebtoken');
const authenticateRequest = require("../utils.js");

dotenv.config()

function generateJWTToken(userObject) {
  return jwt.sign(userObject, process.env.TOKEN_SECRET, { expiresIn: '1d' })
}

router.get("/", authenticateRequest, (req, res) => {
  res.send("You'r in admin");
});

router.post("/signup", async (req, res) => {
  try{
    const data = req.body
    const password = data.password
    bcrypt.genSalt(5, (err, salt) => {
      if (err) {
        return res.status(403).send("error generating hash")
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            return res.status(403).send("error generating hash")
          } else {
            const newData = {
              "username" : data.username,
              "hash" : hash
            }
            const result = new AdminModel(newData);
            result.save();
            const token = generateJWTToken(data);
            res.status(200).send({"token" : token})
          }
        });
      }
    });
  }catch(err){
    return res.status(501).send("Internal Server Error")
  }
})


router.post("/login", async (req, res) => {
  try {
    const data = req.body;
    const result = await AdminModel.find({username : data.username})
    if(result.length == 0){
      return res.status(403).send({
        "message" : "Invalid username"
      })
    }
    const password = data.password
    const hash = result[0].hash

    bcrypt.compare(password, hash, function(err, result) {
      if(result){
        const token = generateJWTToken(data)
        return res.status(201).send({"token" : token})
      }else{
        return res.status(403).send({"message" : "Invalid Password"})
      }
    });
  } catch (err) {
    return res.status(403).send("Error authenticating user")
  }
});

router.post("/save", authenticateRequest, (req, res) => {
  try {
    const data = req.body;
    const student = new StudentModel(data);
    student.save();
    res.status(200).json({
      message: "Data received",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
