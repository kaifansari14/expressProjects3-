import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"
import userModel from "../../models/Users/Users.js";

import bcrypt from "bcrypt";

const router = express.Router();

router.post("/reg", async (req, res) => {
  try {
    let userInput = req.body;
    userInput.password = await bcrypt.hash(userInput.password, 10);

    await userModel.insertOne(userInput);
    res.status(200).json({ msg: "User created sucesfully in web site" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let password = req.body.password;
    let email = req.body.email
    const user = await userModel.findOne({ email:email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let cPass = await bcrypt.compare(password, user.password);
    if (!cPass) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    let payload = {
      id:user._id,
      email
    };

    let token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });

    res.status(200).json({ msg: "login sucessfull", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
