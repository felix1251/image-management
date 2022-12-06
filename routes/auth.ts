import User from "../models/User"
import CryptoJS from "crypto-js"
import { Router, Request, Response } from 'express';
import jwt from "jsonwebtoken"

const router = Router()

//REGISTER 
router.post("/register", async (req:Request, res:Response): Promise<any> => {
      const newUser = new User({
            email: req.body.email as string,
            name: req.body.name as string,
            password: CryptoJS.AES.encrypt(
                  req.body.password as string,
                  process.env.PASS_SEC as string
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
            const user:any = await User.findOne({ email: req.body.email });
            !user && res.status(401).json("Wrong credentials!");
            const hashPassword = CryptoJS.AES.decrypt(
                  user.password as string,
                  process.env.PASS_SEC as string
            );
            const OriginalPassword:string = hashPassword.toString(CryptoJS.enc.Utf8);
            OriginalPassword !== req.body.password &&
            res.status(401).json("Wrong credentials!");
            const accessToken = jwt.sign(
                  {
                        id: user._id as string,
                        isAdmin: user.isAdmin as boolean,
                  },
                  process.env.JWT_SEC as string,
                  { expiresIn: "1d" }
            );
            const { password, ...others } = user._doc;
            res.status(201).json({ ...others, accessToken });
      } catch (err) {
            res.status(500).json;
      }
});

export default router;




