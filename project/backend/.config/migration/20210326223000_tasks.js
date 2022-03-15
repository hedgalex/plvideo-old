const tableName = 'tasks';

export const up = async knex => {
	await knex.schema.dropTableIfExists(tableName)
	return knex.schema.createTable(tableName, t => {
		t.bigIncrements('id');
		t.string('name').defaultTo('');
		t.string('showname').defaultTo('');
		t.integer('origin_id').defaultTo(0);
		t.string('title', 100);
		t.integer('season');
		t.integer('episode');
		t.string('image', 255);
		t.string('path', 255);
		t.string('url', 255);
		t.bigInteger('size').defaultTo(0);
		t.integer('progress').defaultTo(0);
		t.integer('status_id').defaultTo(1);
	})
}

export const down = knex => knex.schema.dropTableIfExists(tableName);