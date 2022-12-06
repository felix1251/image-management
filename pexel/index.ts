import { Response } from "express";
import fetch from 'node-fetch';

const getPexelImages = async (res:Response): Promise<any> => {  
      try {
            const pexelRes = await fetch("https://api.pexels.com/v1/search?query=people&per_page=5",{ headers: { Authorization: process.env.PEXEL_KEY as string } })
            const data = await pexelRes.json();
            const images = data.photos
            res.status(200).json(images)
      } catch (error) {
            res.status(500).json(error)
      }
}

export { getPexelImages }