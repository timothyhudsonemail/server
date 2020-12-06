const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());

const knex = require("knex");

class DB {
  constructor() {
    this.db = knex({
      client: "pg",
      connection:
        "postgres://hikuazdmpywvwf:44cec69642a193a26b8215c3b682ec59f8e8ae938d928839bf6fa9fc15222b38@ec2-3-95-87-221.compute-1.amazonaws.com:5432/d9njlcuunttqkl",
    });
  }

  getAll() {
    return this.db("newtable").select("*");
  }
  getAll2(id) {
    return this.db("msgtable").where(id).select("*");
  }
  update(name, what_it_does) {
    return this.db("msgtable").where(name).update(what_it_does);
  }
}

const data = new DB();

app.get("/a", async (req, res) => {
  try {
    const stuff = await data.getAll();
    res.header("Access-Control-Allow-Origin", "*");
    res.send(stuff);
  } catch {
    console.log("error occured");
    res.sendStatus(500);
  }
});

app.get("/b", async (req, res) => {
  try {
    const newid = { id: "1" };
    const stuff = await data.getAll2(newid);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(stuff);
  } catch {
    console.log("error occured");
    res.sendStatus(500);
  }
});

app.patch("/b", async (req, res) => {
  try {
    const { id, msg } = req.body;
    const stuff = await data.update({ id }, { msg });
    res.header({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    });
    res.json(stuff);
  } catch {
    console.log("error occured");
    res.sendStatus(500);
  }
});

app.get("/c", async (req, res) => {
  try {
    const newid = { id: "2" };
    const stuff = await data.getAll2(newid);
    res.header("Access-Control-Allow-Origin", "*");
    res.send(stuff);
  } catch {
    console.log("error occured");
    res.sendStatus(500);
  }
});

app.patch("/c", async (req, res) => {
  try {
    const { id, msg } = req.body;
    const stuff = await data.update({ id }, { msg });
    res.header({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    });
    res.json(stuff);
  } catch {
    console.log("error occured");
    res.sendStatus(500);
  }
});

app.listen(port, function () {
  console.log("Example app listening on port !");
});
