import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());
app.use(json.express());

const { Pool } = pg;

const connection = new Pool({
  host: "localhost",
  port: 5432,
  database: "pratica_gerenciador_financeiro_9560838b",
  user: "portgres",
  password: "123456",
});

app.listen(4000, () => {
  console.log("Server listening on port 4000!");
});
