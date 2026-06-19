
exports.up = async function(knex) {
  await knex.schema.createTable('todos', function (table) {
    table.increments('id').primary()

    table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

    table.string('title', 255).notNullable()
    table.boolean('is_completed').notNullable().defaultTo(false)

    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now())
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('todos')
};
