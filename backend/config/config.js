module.exports = {
  development: {
    username: process.env.DB_USER || "brightpath_user", // Replace with your PostgreSQL username
    password: process.env.DB_PASSWORD || "MONEYmagnet69", // Replace with your PostgreSQL password
    database: process.env.DB_NAME || "brightpath_db", // Replace with your database name
    host: process.env.DB_HOST || "localhost", // Replace with your database host
    port: process.env.DB_PORT || 5432, // Replace with your database port
    dialect: "postgres", // Explicitly specify the dialect
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Use this cautiously; recommended for development only
      },
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "brightpath_db_test",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Consider stricter validation in production
      },
    },
  },
};
