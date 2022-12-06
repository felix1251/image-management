import Image from "../models/Images"
import { verifyTokenAndAuthorization } from "./verifyToken";
import { Router, Request, Response } from 'express';
import { getPexelImages } from "../pexel/index"

const router = Router()

//CREATE IMAGE
router.post("/", verifyTokenAndAuthorization ,async (req:Request, res:Response): Promise<any> => {
      const newImage = new Image(req.body);
      try {
            const savedImage = await newImage.save();
            res.status(200).json(savedImage);
      } catch (err) {
            res.status(500).json(err);
      }
});

//get images
router.get("/", verifyTokenAndAuthorization, async (req:Request, res:Response): Promise<any> => {
      getPexelImages(res)
});

router.get("/:id", verifyTokenAndAuthorization, async (req:Request, res:Response): Promise<any>=> {
      try {
            const image= await Image.findById(req.params.id);
            res.status(200).json(image);
      } catch (err) {
            res.status(500).json(err);
      }
});

export default router;