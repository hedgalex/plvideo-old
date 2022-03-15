const tableName = 'status';

exports.seed = knex =>
	knex(tableName).del()
	.then(() => knex(tableName).insert([
		{id: 1, status: 'IDLE'},
		{id: 2, status: 'IN_PROGRESS'},
		{id: 3, status: 'READY'},
	]));
