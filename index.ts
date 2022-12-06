import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express()
dotenv.config()

const mongoUrl:string|undefined = process.env.MONGO_URL

mongoose.set('strictQuery', true);
mongoose.connect(mongoUrl as string)
      .then(() => console.log("DBconnection Successful"))
      .catch((err) => {
            console.log(err);
      });

app.listen(process.env.PORT || 5000, () => {
      console.log("server is running")
})