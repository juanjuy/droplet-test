const { dbQuery } = require("./db-query");

module.exports = class PgPersistence {
  async loadNotes() {
    const LOAD_NOTES = "SELECT * FROM notes"

    let notes = dbQuery(LOAD_NOTES)
    return notes;
  }

  async createNote(content) {
    const CREATE_NOTE = "INSERT INTO notes (content) VALUES ($1)";

    let result = await dbQuery(CREATE_NOTE, content);
    return !!result;
  }
}