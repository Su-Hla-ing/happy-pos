import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "pos-app-database",
  password: "$%@d*n%UCSL",
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
