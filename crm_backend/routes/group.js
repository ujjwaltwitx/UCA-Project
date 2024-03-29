const express = require("express");
const router = express.Router();

const GroupModel = require("../models/group.js");
const { default: mongoose } = require("mongoose");
const authenticateRequest = require("../utils.js");

router.get("/view", authenticateRequest, async (req, res) => {
  try {
    const groupList = await GroupModel.find();
    res.json(groupList);
  } catch (error) {
    res.status = 500;
    res.send(error);
  }
});

router.get("/view/:id", authenticateRequest, async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Not a valid objectId",
      });
    }
    const group = await GroupModel.findById(id).populate("tutors");
    res.json(group);
  } catch (error) {
    res.status = 500;
    res.send(error);
  }
});

router.delete("/delete/:id", authenticateRequest, async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "Invalid objectId format",
      });
      return;
    }

    const result = GroupModel.deleteOne({ _id: id });

    if (result.deleteCount === 0) {
      res.status(400).send({
        message: "ObjectId doesn't exists",
      });
      return;
    }

    res.status(200).send({
      message: "group deleted",
    });
  } catch (error) {
    res.status(400).send({
      message: "Internal Server Error",
    });
  }
});

router.patch("/update/:id", authenticateRequest, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "Invalid objectId format",
      });
      return;
    }

    const result = GroupModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      return res.status(400).send({
        message: "Group Not found",
      });
    }

    return res.status(200).send({
      message: "record update successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.post("/add", authenticateRequest, async (req, res) => {
  const data = req.body;
  if (
    !data.name ||
    data.name === "" ||
    data.noStudents === "" ||
    !data.tutors
  ) {
    res.status(400).send({
      message: "Name is required",
    });
  }

  const group = new GroupModel(data);
  await group.save();

  res.status(200).send({
    status: "successful",
  });
});

module.exports = router;
