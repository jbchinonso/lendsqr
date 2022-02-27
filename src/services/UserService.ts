import knex from "../database/db";
import bcrypt from "bcrypt";
import { Iaccount, Iuser, Itransaction, ItransferObj } from "..";

class UserService {
  static async createUser(userData: Iuser) {
    const { first_name, last_name, email, password } = userData;

    const salt = await bcrypt.genSalt(8);
    const hashedPass = await bcrypt.hash(password, salt);

    try {
      const existingUser = await knex("users").where({ email: email });

      if (existingUser.length)
        throw new Error("email is already registered with us");

      return await knex("users").insert({
        first_name,
        last_name,
        email,
        password: hashedPass,
      }).select("id");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async createAccount(userId: string) {
    const code = "002";
    const accountNumber = code + Math.random().toString().substr(2, 7);

    try {
 
      await knex("accounts").insert({
        user_id: userId,
        account_number: accountNumber,
      });



      return accountNumber;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async accountDetail(accountNumber: string) {
    try {
      return await knex("accounts").where({
        account_number: accountNumber,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async debitUser(detail: Itransaction) {
    const { user_id, account_number, amount } = detail;

    try {
      const balance = parseFloat(
        (
          await knex("accounts")
            .where({ user_id, account_number })
            .select("balance")
        )[0].balance
      );

      if (balance < amount) throw new Error("insuffient balance");

      let calBal = (balance * 100 - amount * 100) / 100;

      return await knex("accounts")
        .where({ user_id })
        .update({ balance: calBal });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async creditUser(detail: Itransaction) {
    const { user_id, account_number, amount } = detail;

    try {
      const balance = parseFloat(
        (
          await knex("accounts")
            .where({ user_id, account_number })
            .select("balance")
        )[0].balance
      );
      let calBal = (balance * 100 + amount * 100) / 100;

      return await knex("accounts")
        .where({ user_id, account_number })
        .update({ balance: calBal });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async transfer(transferObj: ItransferObj) {
    const {
      user_id,
      account_number,
      beneficiaryId,
      beneficiaryAccount,
      amount,
    } = transferObj;

    return await knex.transaction(async (trx) => {
      Promise.all([
        await this.debitUser({ user_id, account_number, amount }),
        await this.creditUser({
          user_id: beneficiaryId,
          account_number: beneficiaryAccount,
          amount,
        }),
      ]);
    });
  }
}

export default UserService;
