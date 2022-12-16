import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth"
import imageRoute from "./routes/image"
import refreshTokenRoute from "./routes/refreshToken"
import userRoute from "./routes/user"
import cors from "cors"
dotenv.config()

const run:Function = async ():Promise<void> => {
      mongoose.set('strictQuery', true);
      const dbConnected = await mongoose.connect(process.env.MONGO_URL as string)
      if(dbConnected) console.log("DB is connected")

      const app = express()
      app.use(cors());
      app.use(express.json());
      app.use("/auth", authRoute);
      app.use("/users", userRoute);
      app.use("/images", imageRoute);
      app.use("/refreshToken", refreshTokenRoute);
      app.listen(process.env.PORT || 5000, () => {console.log("server is running")})
}

run()