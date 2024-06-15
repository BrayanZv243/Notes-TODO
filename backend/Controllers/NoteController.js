const NoteDAO = require("../data-access/NoteDAO");

class NoteController {
    static async createNote(req, res, next) {
        try {
            const note = req.body;
            const noteAdded = await NoteDAO.createNote(note);

            res.status(200).json(noteAdded);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }

    static async getAllNotes(req, res, next) {
        try {
            const notes = await NoteDAO.getAllNotes();
            res.status(200).json(notes);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateNote(req, res, next) {
        try {
            const note = req.body;
            const id_note = req.params.id;
            const noteUpdated = await NoteDAO.updateNote(id_note, note);

            res.status(200).json(noteUpdated);
        } catch (error) {
            switch (error.message) {
                case "Note not Found":
                    return res.status(404).json({ error: error.message });
                default:
                    return res.status(500).json({ error: error.message });
            }
        }
    }

    static async deleteNote(req, res, next) {
        try {
            const id_note = req.params.id;
            const noteDeleted = await NoteDAO.deleteNote(id_note);

            res.status(200).json(noteDeleted);
        } catch (error) {
            switch (error.message) {
                case "Note not Found":
                    return res.status(404).json({ error: error.message });
                default:
                    return res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = NoteController;
