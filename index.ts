import express from "express"
import dotenv from "dotenv"
const app = express()
dotenv.config()

app.listen(process.env.PORT || 5000, () => {
      console.log("server is running")
})