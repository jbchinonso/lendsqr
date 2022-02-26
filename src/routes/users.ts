import express, { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

/* GET users listing. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("respond with a resource");
});

router.post("/signup", UserController.registerUser);
router.post("/widthdrawal", UserController.withdrawal) 
router.post('/deposit', UserController.fundAccount)
router.post('/transfer', UserController.transfer)

export default router;
