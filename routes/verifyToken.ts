import jwt from "jsonwebtoken"
import { Response } from 'express';

const verifyToken = (req: any, res: Response, next:Function): void|Response =>{
      const authHeader:string = req.headers.token as string;
      if (authHeader){
            const token:string = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SEC as string, (err:any, user:any) => {
                  if (err) res.status(403).json("Token is not valid");
                  req.user = user as {};
                  next();
            });
      }else {
            return res.status(401).json("You are not authenticated");
      }
}

//verify if owner or admin
const verifyTokenAndAuthorization = (req:any, res:Response, next:Function): void|Response=> {
      verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                  next();
            } else {
                  res.status(403).json("You are not allowed to do that!");
            }
      });
};

//verify only admin
const verifyTokenAndAdmin = (req:any, res:Response, next:Function): void|Response => {
      verifyToken(req, res, () => {
      if (req.user.isAdmin) {
            next();
      } else {
            res.status(403).json("You are not allowed to do that!");
      }
      });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};

