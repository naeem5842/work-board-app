import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import User from './src/Models/userModel.js' 
import userRoutes from './src/Routes/user.js'
import taskRoutes from './src/Routes/task.js'

dotenv.config();

const app = express();
const PORT = 3001 || process.env.PORT;
const connectionString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.whfbjoa.mongodb.net/work-board-app?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB atlas");
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB Atlas", err);
  });


app.get("/", (req, res) => {
  try {
    res.send("server has returned a response");
  } catch (error) {
    console.error(error);
    res.status(500).send("error from the server");
  }
});

app.post("/login", (req, res) => {});



app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
