exports.up = function (knex) {
  return knex.schema.createTable("_users", function (table) {
    table.increments("id");
    table.string("firstname", 255).notNullable();
    table.string("lastname", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.text("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("_users");
};
