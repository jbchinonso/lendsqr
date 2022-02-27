import Knex from "knex";
import knexFile from "./knexfile"
import dotenv from "dotenv"
dotenv.config();
//connect to database
const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexFile[environment]);



export default knex