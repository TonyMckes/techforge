/** @type {import('sequelize').Options} */
const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT || "postgres",
  custom: process.env.CUSTOM,
};

module.exports = {
  development: {
    ...config,
  },
  test: {
    ...config,
    logging: false,
  },
  production: {
    ...config,
  },
};
