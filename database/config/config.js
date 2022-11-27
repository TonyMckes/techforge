const { env } = process;

module.exports = {
  development: {
    username: env.DEV_DB_USERNAME,
    password: env.DEV_DB_PASSWORD,
    database: env.DEV_DB_NAME,
    host: env.DEV_DB_HOSTNAME,
    dialect: "postgres",
  },
  test: {
    username: env.TEST_DB_USERNAME,
    password: env.TEST_DB_PASSWORD,
    database: env.TEST_DB_NAME,
    host: env.TEST_DB_HOSTNAME,
    dialect: "postgres",
  },
  production: {
    username: env.PROD_DB_USERNAME,
    password: env.PROD_DB_PASSWORD,
    database: env.PROD_DB_NAME,
    host: env.PROD_DB_HOSTNAME,
    port: env.PROD_DB_PORT,
    dialect: "postgres",
  },
};
