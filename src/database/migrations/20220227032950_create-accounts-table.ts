import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("accounts", (table) => {
    table.increments("id").primary(),
      table.integer("user_id").notNullable();
    table.string("account_number", 255).index().notNullable().unique(),
      table.double("balance").unsigned().defaultTo(0);
    table.foreign("user_id").references("users.id").onDelete("cascade");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("accounts");
}
