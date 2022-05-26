const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const PgPersistence = require("./lib/pg-persistence")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.locals.store = new PgPersistence(req.session);
  next();
})

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.redirect("/notes");
})

app.get("/notes", (req, res) => {
  let fetch = async function() {
    let store = res.locals.store;
    let notes = await store.loadNotes();
    console.log(notes.rows);
    res.render("notes", { notes: notes.rows })
  }

  fetch();
})

app.post("/notes/new", (req, res) => {
  let create = async function() {
    await res.locals.store.createNote(req.body.note)
    res.redirect("/")
  }

  create();
})

app.listen(port, () => console.log("Running your app"));