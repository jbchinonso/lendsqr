import Joi from 'joi'


export const UserValidator = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(255).required(),
});


export const AccountValidator = Joi.object({
    user_id: Joi.string().required(),
    account_number: Joi.string().required(),
  balance: Joi.number()
});


export const TransactionValid = Joi.object({
  user_id: Joi.string().required(),
  account_number: Joi.string().required(),
  amount: Joi.number().required(),
});


export const TransferValid = Joi.object({
  user_id: Joi.string().required(),
  account_number: Joi.string().required(),
  beneficiary: Joi.string().required(),
  amount: Joi.number().required(),
});