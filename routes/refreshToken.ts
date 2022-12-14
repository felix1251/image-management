import { Router, Request, Response } from 'express'
import jwt from "jsonwebtoken"
import User from "../models/User"
const router = Router()

router.post('/', async (req:Request, res:Response) => {
  const refreshToken:string|any = req.headers.refreshToken
  if (refreshToken) {
    jwt.verify( refreshToken, process.env.JWT_REFRESH_SEC as string,
      async (err:any, decodedUser:any) => {
        if (err) return res.status(406).json({ message: 'Unauthorized',  error: err })
        let user:any;
        try{
          user = await User.findOne({ id: decodedUser.id});
        }catch (err2){
          return res.status(406).json({ message: 'Unauthorized', error: err2 })
        }
        const accessToken = jwt.sign(
          {
            id: user._id as string,
            isAdmin: user.isAdmin as boolean,
          },
          process.env.JWT_SEC as string,
          { expiresIn: "1d" }
        );
        const refreshToken = jwt.sign(
          {
            id: user._id as string,
          }, process.env.JWT_REFRESH_SEC as string, 
          { expiresIn: '7d' }
        );
        return res.json({ accessToken, refreshToken })
      },
    )
  } else {
    return res.status(406).json({ message: 'Unauthorized' })
  }
})

export default router
