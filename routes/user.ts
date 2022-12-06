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
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
      try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted..");
      } catch (err) {
            res.status(500).json(err);
      }
});


export default router;