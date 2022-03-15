require('@babel/register');

module.exports = {

	development: {
		client: 'pg',
		connection: 'postgres://plvideo:plvideo@localhost:5432/plvideo',
		migrations: {
			directory: './migration',
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: './seeds/dev'
		}
	},

	staging: {
		client: 'pg',
		connection: {
			database: 'plvideo',
			user: 'plvideo',
			password: 'plvideo',
			port: 5432
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './migration',
			tableName: '/knex_migrations'
		},
		seeds: {
			directory: './seeds/dev'
		}
	},

	production: {
		client: 'pg',
		connection: {
			database: 'plvideo',
			user: 'plvideo',
			password: 'plvideo',
			port: 5432
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			directory: './migration',
			tableName: 'knex_migrations'
		},
		seeds: {
			directory: './seeds/prod'
		}
	}

}
