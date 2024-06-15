import { DragDropContext } from "@hello-pangea/dnd";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import NoteCreate from "./components/NoteCreate";
import NoteList from "./components/NoteList";
import NoteComputed from "./components/NoteComputed";
import NoteFilter from "./components/NoteFilter";
import NoteService from "./services/NoteService";
import Loading from "./components/icons/IconLoading";
import Swal from "sweetalert2";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const initialNotes = await NoteService.getAllNotes();
                const convertedNotes = convertTinyIntToBoolean(initialNotes);

                setNotes(convertedNotes || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching initial notes:", error);
                setLoading(false);
            }
        };

        // Function to convert tinyint to boolean (0 and 1), (false and true).
        const convertTinyIntToBoolean = (notesArray) => {
            return notesArray.map((note) => ({
                ...note,
                completed: note.completed === 1,
                archived: note.archived === 1,
            }));
        };

        fetchData();
    }, []);

    const reOrder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    const createNote = async (title) => {
        const newNote = {
            id_note: Date.now(),
            title,
            completed: false,
            archived: false,
        };

        try {
            const savedNote = await NoteService.createNote(newNote);
            setNotes([...notes, savedNote]);
        } catch (error) {
            console.error("Error creating note:", error);
        }

        Swal.fire({
            title: "Good job!",
            text: "Note created successfully!",
            icon: "success",
            color: "white",
            background: "#1a202c",
        });
    };

    const removeNote = async (id_note) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            color: "white",
            background: "#1a202c",
        });

        if (result.isConfirmed) {
            try {
                await NoteService.deleteNote(id_note);
                setNotes(notes.filter((note) => note.id_note !== id_note));
            } catch (error) {
                console.error("Error deleting note:", error);
            }
            Swal.fire({
                title: "Deleted!",
                text: "Your note has been deleted.",
                icon: "success",
                color: "white",
                background: "#1a202c",
            });
        }
    };

    const updateNote = async (id_note) => {
        try {
            const noteToUpdate = notes.find((note) => note.id_note === id_note);
            await NoteService.updateNote(id_note, {
                completed: !noteToUpdate.completed,
            });
            setNotes(
                notes.map((note) =>
                    note.id_note === id_note
                        ? { ...note, completed: !note.completed }
                        : note,
                ),
            );
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const archiveNote = async (id_note) => {
        const note = notes.find((note) => note.id_note === id_note);

        if (!note) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The note doesn't exists!",
            });
            return;
        }

        const buttonText = note.archived ? "Unarchive" : "Archive";

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be able to revert this anyways ;)",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, " + buttonText + " it!",
            color: "white",
            background: "#1a202c",
        });

        if (result.isConfirmed) {
            try {
                await NoteService.updateNote(id_note, {
                    archived: !note.archived,
                });
                setNotes(
                    notes.map((note) =>
                        note.id_note === id_note
                            ? { ...note, archived: !note.archived }
                            : note,
                    ),
                );
            } catch (error) {
                console.error("Error archiving note:", error);
            }
            Swal.fire({
                title: buttonText + "d!",
                text: "Your note has been " + buttonText.toLowerCase() + "d.",
                icon: "success",
                color: "white",
                background: "#1a202c",
            });
        }
    };

    const computedItemsLeft = notes.filter((note) => !note.completed).length;

    const clearCompleted = async () => {
        try {
            const completedNotes = notes.filter((note) => note.completed);
            if (completedNotes.length === 0) return;
            await Promise.all(
                completedNotes.map((note) =>
                    NoteService.deleteNote(note.id_note),
                ),
            );
            setNotes(notes.filter((note) => !note.completed));
        } catch (error) {
            console.error("Error clearing completed notes:", error);
        }
    };

    const filteredNotes = () => {
        switch (filter) {
            case "all":
                return notes;
            case "active":
                return notes.filter(
                    (note) => !note.completed && !note.archived,
                );
            case "completed":
                return notes.filter((note) => note.completed);
            case "archived":
                return notes.filter((note) => note.archived);
            default:
                return notes;
        }
    };

    const changeFilter = (filter) => setFilter(filter);

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        setNotes((prevTasks) =>
            reOrder([...prevTasks], source.index, destination.index),
        );
    };

    return (
        <>
            <div
                className="min-h-screen bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] 
            bg-contain bg-no-repeat transition-all
            duration-1000 md:bg-[url('./assets/images/bg-desktop-light.jpg')] dark:bg-gray-900
            dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
            >
                <Header />

                <main className="container mx-auto mt-8 px-4 md:max-w-xl">
                    <NoteCreate createNote={createNote} />

                    <DragDropContext onDragEnd={handleDragEnd}>
                        <NoteList
                            notes={filteredNotes()}
                            removeNote={removeNote}
                            archiveNote={archiveNote}
                            updateNote={updateNote}
                        />
                        {loading && <Loading />}
                    </DragDropContext>

                    <NoteComputed
                        computedItemsLeft={computedItemsLeft}
                        clearCompleted={clearCompleted}
                    />
                    <NoteFilter changeFilter={changeFilter} filter={filter} />
                </main>

                <footer className="mt-8 text-center transition-all duration-1000 dark:text-gray-400">
                    Drag and Drop to reorder list
                </footer>
            </div>
        </>
    );
};

export default App;
