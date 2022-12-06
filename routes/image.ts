import Image from "../models/Images"
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyToken";
import { Router, Request, Response } from 'express';

const router = Router()

//CREATE
router.post("/", verifyTokenAndAuthorization ,async (req:Request, res:Response): Promise<any> => {
      const newImage = new Image(req.body);
      try {
            const savedImage = await newImage.save();
            res.status(200).json(savedImage);
      } catch (err) {
            res.status(500).json(err);
      }
});

export default router;