import { Response } from "express";
import Images from "../models/Images";
import fetch from 'node-fetch';
import cloudinary from "./cloudinary";

const getPexelImagesAndUpload = async (res:Response): Promise<any> => { 

      const categories:Array<string> = ["people", "ocean", "nature", "cars", "tigers", "kids", "computer", "fish", "cows"]
      const randomSelect:string = categories[Math.floor(Math.random() * categories.length)];

      try {
            const pexelRes = await fetch(`https://api.pexels.com/v1/search?query=${randomSelect}&per_page=5`, { headers: { Authorization: process.env.PEXEL_KEY as string } })
            const data = await pexelRes.json();
            
            let res_promises = data.photos.map((item:any) => new Promise((resolve, reject) => {
                        cloudinary.uploader.upload(item.src.small, { folder: "images" }, (error:any, result:any): void => {
                              if(error) reject(error)
                              else resolve(result)
                        })
                  })
            )

            const imageUploadRes = await Promise.all(res_promises)
            const imageUrls:Array<{url: string}> = imageUploadRes.map((item:any) => {
                  return {url: item.url};
            })

            const options = { ordered: true };
            await Images.insertMany(imageUrls, options);

            const limit: number = 5 
            const showImages = await Images.find().sort({ createdAt: -1 }).limit(limit);

            res.status(200).json({limit: limit, data: showImages})

      } catch (error) {
            res.status(500).json(error)
      }
}

export { getPexelImagesAndUpload }