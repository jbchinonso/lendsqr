import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

//fake authentication
export default function auth(req:Request, res:Response, next: NextFunction) {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjE5MDg5MDkwIiwibmFtZSI6IkpCQXV0aCIsImlhdCI6MTUxNjIzOTAyMn0.iylHFtYnNMFEiBvd-riWmlh1xDYouZHEvETW69oDsOU";
    
    if (!token) {
        return res.status(401).send({status: 401, message: "token is not Provided"})
    }

    const decoded = jwt.verify(token, "lendsqr") as {sub: string, name:string, iat: number}


    const { sub, name } = decoded
    
    if (sub !== "1219089090" || name !== "JBAuth") {
        res.status(401).send({status: 401, message: "Invalid token"})
    }

    next()
    
}