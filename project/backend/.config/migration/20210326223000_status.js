const tableName = 'status';

export const up = async knex => {
	await knex.schema.dropTableIfExists(tableName)
	return knex.schema.createTable(tableName, t => {
		t.increments('id');
		t.string('status', 100).defaultTo(1);
	})
}

export const down = knex => knex.schema.dropTableIfExists(tableName);
