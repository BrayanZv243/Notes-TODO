import { API_BASE } from "./api_base";

class NoteService {
    static endpoint = "note";

    static async getAllNotes() {
        try {
            const response = await fetch(`${API_BASE}/${this.endpoint}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return Object.values(await response.json());
        } catch (error) {
            console.error("Error fetching all notes:", error);
            throw error;
        }
    }

    static async createNote(note) {
        try {
            const response = await fetch(`${API_BASE}/${this.endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(note),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        } catch (error) {
            console.error("Error creating note:", error);
            throw error;
        }
    }

    static async updateNote(id_note, note) {
        try {
            const response = await fetch(
                `${API_BASE}/${this.endpoint}/${id_note}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(note),
                },
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating note with id ${id_note}:`, error);
            throw error;
        }
    }

    static async deleteNote(id_note) {
        try {
            const response = await fetch(
                `${API_BASE}/${this.endpoint}/${id_note}`,
                {
                    method: "DELETE",
                },
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return await response.json();
        } catch (error) {
            console.error(`Error deleting note with id ${id_note}:`, error);
            throw error;
        }
    }
}

export default NoteService;
