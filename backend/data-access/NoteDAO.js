const initModels = require("../migrations/init-models"); // Ajusta la ruta al archivo init-models.js
const { sequelize } = require("../migrations");
const models = initModels(sequelize);
const Note = models.note;

class NoteDAO {
    constructor() {}

    static async createNote(note) {
        try {
            const { id_note, title, completed, archived } = note;
            return await Note.create({ id_note, title, completed, archived });
        } catch (error) {
            throw error;
        }
    }

    static async getAllNotes() {
        try {
            return await Note.findAll();
        } catch (error) {
            throw error;
        }
    }

    static async updateNote(id_note, note) {
        try {
            const noteToUpdate = await Note.findByPk(id_note);
            if (!noteToUpdate) throw new Error("Note not Found");

            const { completed, archived } = note;
            await Note.update({ completed, archived }, { where: { id_note } });
            return await Note.findByPk(id_note);
        } catch (error) {
            throw error;
        }
    }

    static async deleteNote(id_note) {
        try {
            const note = await Note.findByPk(id_note);
            if (!note) throw new Error("Note not Found");
            await note.destroy();
            return note;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = NoteDAO;
