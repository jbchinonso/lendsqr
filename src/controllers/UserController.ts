import {Request, Response, NextFunction} from "express"
import { UserValidator, TransactionValid, TransferValid } from "../validators/validators";
import UserService from "../services/UserService";
import { Iuser } from "..";

class UserController {
  static async registerUser(req: Request, res: Response) {
    const userData = <Iuser>req.body;

    try {
      const { error, value } = UserValidator.validate(userData);

      if (error) throw new Error(error.message);

      const userId = (await UserService.createUser(
        value
      )) as unknown[] as number[];

      const accountNumber = await UserService.createAccount(userId[0]);

      const accountDetails = {
        account_name: userData.first_name + " " + userData.last_name,
        account_number: accountNumber,
      };

      return res.status(201).send({
        status: 201,
        message: "success",
        accountDetails: accountDetails,
      });
    } catch (error: any) {
      res.status(400).send({ status: 400, message: error.message });
    }
  }

  static async withdrawal(req: Request, res: Response) {
    const details = req.body;

    try {
      const { error, value } = TransactionValid.validate(details);
      if (error) throw new Error(error.message);

      await UserService.debitUser(value);

      return res.status(200).send({ status: 200, message: "success" });
    } catch (error: any) {
      return res.status(400).send({ status: 400, message: error.message });
    }
  }
    
    static async fundAccount(req: Request, res: Response) {
        const details = req.body;

        try {
          const { error, value } = TransactionValid.validate(details);
          if (error) throw new Error(error.message);

          await UserService.creditUser(value);

          return res.status(200).send({ status: 200, message: "success" });
        } catch (error: any) {
          return res.status(400).send({ status: 400, message: error.message });
        }
    }

  static async transfer(req: Request, res: Response) {
      const details = req.body;
      try {
          const { error, value } = TransferValid.validate(details)
          
          if(error) throw new Error(error.message)

          const { user_id, account_number, beneficiary, amount } = value

          const senderDetail = { user_id, account_number, amount };

          const receiver = await UserService.accountDetail(beneficiary);

          const [receiverDetail] = receiver;
          
          const transferPaymentOBj = {
            user_id,
            account_number,
            beneficiaryId: receiverDetail.user_id,
            beneficiaryAccount: receiverDetail.account_number,
            amount,
          };
          
          await UserService.transfer(transferPaymentOBj);

          return res.status(200).send({status: 200, message: "success"})
          
      } catch (error: any) {
          return res.status(400).send({ status: 400, message: error.message });
      }
  }
}

export default UserController