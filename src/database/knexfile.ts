import path from "path"
import dotenv from "dotenv"
dotenv.config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USR || "lendsqr",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "lendsqr",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "testdb.sqlite3"),
    },
    migrations: {
      tableName: "knex_migrations",
    },
    useNullAsDefault: true,
  },
};


export default config;