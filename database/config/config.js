const { env } = process;

module.exports = {
  development: {
    username: env.DEV_DB_USERNAME,
    password: env.DEV_DB_PASSWORD,
    database: env.DEV_DB_DATABASE,
    host: env.DEV_DB_HOST,
    dialect: env.DEV_DB_DIALECT,
  },
  test: {
    username: env.TEST_DB_USERNAME,
    password: env.TEST_DB_PASSWORD,
    database: env.TEST_DB_DATABASE,
    host: env.TEST_DB_HOST,
    dialect: env.TEST_DB_DIALECT,
  },
  production: {
    username: env.PROD_DB_USERNAME,
    password: env.PROD_DB_PASSWORD,
    database: env.PROD_DB_DATABASE,
    host: env.PROD_DB_HOST,
    dialect: env.PROD_DB_DIALECT,
  },
};
