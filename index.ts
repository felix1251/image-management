import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth";
import imageRoute from "./routes/image";
import cors from "cors"
const app = express()
dotenv.config()

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL as string)
      .then(() => console.log("DBconnection Successful"))
      .catch((err) => {
            console.log(err);
      });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/image", imageRoute);

app.listen(process.env.PORT || 5000, () => {
      console.log("server is running")
})