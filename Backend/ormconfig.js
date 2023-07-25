const connections = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: ['error'],
    synchronize: false,
    entities: [`${__dirname}/src/entities/*.ts`, `${__dirname}/src/entities/**/*.ts`],
    subscribers: [`${__dirname}/src/subscribers/**/*.ts`],
    cli: {
      entitiesDir: `${__dirname}/src/entities`,
      subscribersDir: `${__dirname}/src/subscribers`,
    },
    extra: {
      poolMax: 1,
    },
  },
];

module.exports = connections;
