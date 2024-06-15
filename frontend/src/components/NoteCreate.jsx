import { useState } from "react";

const NoteCreate = ({ createNote }) => {
    const [title, setTitle] = useState("");

    const handleSubmitAddNote = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return setTitle("");
        }

        createNote(title.trim());
        setTitle("");
    };

    return (
        <>
            <form
                onSubmit={handleSubmitAddNote}
                className="flex items-center gap-4 overflow-hidden rounded-md 
                bg-white px-4 py-4 transition-all duration-1000 dark:bg-gray-800"
            >
                <span className="inline-block h-5 w-5 rounded-full border-2"></span>
                <input
                    type="text"
                    placeholder="Create a new note..."
                    className="size-4 w-full text-gray-500 outline-none 
                    transition-all duration-1000 dark:bg-gray-800"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </form>
        </>
    );
};

export default NoteCreate;
