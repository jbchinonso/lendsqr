import { string } from "joi"

export interface Iuser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}


export interface Iaccount{
    user_id: string,
    account_number: string,
    balance: number
}

export interface Itransaction {
  user_id: number,
  account_number: string;
  amount: number;
}


export interface ItransferObj{
  user_id: number,
  account_number: string,
  beneficiaryId: number,
  beneficiaryAccount: string,
  amount: number
}