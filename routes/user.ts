import User from "../models/User"
import { verifyTokenAndAuthorization, verifyTokenAndAdmin} from "./verifyToken";
import { Router, Request, Response } from 'express';

const router = Router()

//update user if only owner or admin access
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

//delete a certain user (admin only)
router.delete("/:id", verifyTokenAndAdmin, async (req:Request, res:Response): Promise<any> => {
      try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted..");
      } catch (err) {
            res.status(500).json(err);
      }
});

//get single user (only admin)
router.get("/:id", verifyTokenAndAdmin, async (req:Request, res: Response): Promise<any> => {
      try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user);
      } catch (err) {
            res.status(500).json(err);
      }
});

//get all users (only admin)
router.get("/", verifyTokenAndAdmin, async (req:Request, res:Response): Promise<any> => {
      try {
            const users = await User.find()
            res.status(200).json(users)
      } catch (err) {
            res.status(500).json(err);
      }
});



export default router;