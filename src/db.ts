import Knex from "knex";
import knexFile from "./knexfile"
//connect to database
const knex = Knex(knexFile.development);



export default knex