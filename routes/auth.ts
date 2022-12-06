import User from "../models/User"
import CryptoJS from "crypto-js"
import { Router, Request, Response } from 'express';
import jwt from "jsonwebtoken"

const router = Router()

//REGISTER 
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

//LOGIN
router.post("/login", async (req:Request, res:Response): Promise<any> => {
      try {
            const user:any = await User.findOne({ username: req.body.username });
            !user && res.status(401).json("Wrong credentials!");
            const hashPassword = CryptoJS.AES.decrypt(
                  user.password,
                  process.env.PASS_SEC
            );
            const OriginalPassword:string = hashPassword.toString(CryptoJS.enc.Utf8);
            OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong credentials!");
            const accessToken = jwt.sign(
                  {
                        id: user._id,
                        isAdmin: user.isAdmin,
                  },
                  process.env.JWT_SEC,
                  { expiresIn: "1d" }
            );
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });
      } catch (err) {
            res.status(500).json;
      }
});




