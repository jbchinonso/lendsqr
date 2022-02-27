import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.createTable("users", (table) => {
      table.increments("id").primary(),
        table.string("first_name", 255).notNullable(),
        table.string("last_name", 255).notNullable(),
        table.string("email", 255).index().notNullable().unique(),
        table.string("password", 255).notNullable(),
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTable("users");
}

