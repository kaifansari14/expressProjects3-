import express from "express";
import dotenv from "dotenv";
dotenv.config();

// import data base
import "./utils/dbConnect.js";

// import User Router public
import publicRouter from "./controllers/public/index.js";

// import User Router private 
import privateRouter from "./controllers/private/index.js"

// import JWT from jwt
import auth from "./auth/auth.js"

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome API's" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/public", publicRouter);
app.use(auth)
app.use("/private", privateRouter)

app.listen(PORT, () => {
  console.log(`SERVER is live at http://localhost:${PORT}`);
});
