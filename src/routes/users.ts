import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/UserController';
import auth from "../Auth/Auth";

const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/signup", UserController.registerUser);
router.post("/widthdrawal",auth, UserController.withdrawal) 
router.post('/deposit', auth, UserController.fundAccount)
router.post('/transfer', auth, UserController.transfer)

export default router;
