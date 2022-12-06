import User from "../models/User"
import CryptoJS from "crypto-js"
import { Router, Request, Response } from 'express';

const router = Router()

router.post("/register", async (req:Request, res:Response): Promise<any> => {
      const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                  req.body.password,
                  process.env.PASS_SEC
            ).toString()
      });

      try{
            const saveUser = await newUser.save()
            res.status(201).json(saveUser)
      }catch (err){
            res.status(500).json(err);
      }
})




