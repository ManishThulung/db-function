const { Pool } = require("pg");
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "db-function",
  password: "password",
  port: "5432",
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  logging: true,
});

// Now you can use the pool to execute queries
