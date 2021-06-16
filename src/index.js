import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const { Pool } = pg;

const connection = new Pool({
  host: "localhost",
  port: 5432,
  database: "pratica_gerenciador_financeiro_9560838b",
  user: "postgres",
  password: "123456",
});

app.get("/api/finances", async (req, res) => {
  const result = await connection.query(
    "SELECT id, value, description, event_type FROM financial_events;"
  );
  res.send(result.rows);
});

app.post("/api/finances", async (req, res) => {
  const time = Date();
  const { value, description, event_type } = req.body;
  let amount = value;
  if (event_type === "expense") {
    amount = -value;
  }
  if (
    description.trim().length !== 0 &&
    value !== 0 &&
    typeof value === "number"
  ) {
    await connection.query(
      "INSERT INTO financial_events (value,description,event_type,created_at) VALUES ($1,$2,$3,$4)",
      [value, description, event_type, time]
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(4000, () => {
  console.log("Server on port 4000!");
});
