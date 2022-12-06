import { v2 as cloudinary } from 'cloudinary'
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
      cloud_name: process.env.CLOUD_NAME as string, 
      api_key: process.env.CLOUD_KEY as string,
      api_secret: process.env.CLOUD_SECRET as string,
})

export default cloudinary;