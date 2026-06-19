
exports.up = async function(knex) {
  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary()

    table.string('username', 100).notNullable().unique()
    table.string('password_hash', 255).notNullable()

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users')
};
