import User from "../models/User"
import { verifyTokenAndAuthorization } from "./verifyToken";
import { Router, Request, Response } from 'express';
const router = Router()

//update user if only user and admin
router.put("/:id", verifyTokenAndAuthorization, async (req:Request, res:Response): Promise<any> => {
      try {
            const updateUser = await User.findByIdAndUpdate(
                  req.params.id,
                  {
                        $set: req.body,
                  },
                  { new: true }
            );
            res.status(200).json(updateUser);
      } catch (err) {
            res.status(500).json(err);
      }
});