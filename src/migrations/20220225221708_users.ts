import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary(),
        table.string("first_name", 255).notNullable(),
        table.string("last_name", 255).notNullable(),
        table.string("email", 255).index().notNullable().unique(),
        table.string("password", 255).notNullable(),
        table.timestamps(true, true);
    })
    .createTable("accounts", (table) => {
      table.increments("id").primary(),
        table
          .integer("user_id")
          .references("id")
          .inTable("users")
          .notNullable()
          .onDelete("cascade"),
        table.string("account_number", 255).index().notNullable().unique(),
        table.float("balance").unsigned().defaultTo(0);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users").dropTable("accounts");
}
