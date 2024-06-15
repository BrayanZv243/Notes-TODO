import IconCheck from "./icons/IconCheck";
import IconCross from "./icons/IconCross";
import IconArchive from "./icons/IconArchive";
import IconUnarchive from "./icons/IconUnarchive";
import React from "react";

const NoteItem = React.forwardRef(
    ({ note, removeNote, archiveNote, updateNote, ...props }, ref) => {
        const { id_note, title, completed, archived } = note;
        return (
            <>
                <article
                    {...props}
                    ref={ref}
                    className="flex gap-4 border-b border-b-gray-400"
                >
                    <button
                        className={`h-5 w-5 flex-none rounded-full border-2 ${
                            completed
                                ? "grid place-items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                : "inline-block"
                        }`}
                        onClick={() => updateNote(id_note)}
                    >
                        {completed && <IconCheck />}
                    </button>

                    <p
                        className={`grow text-gray-700 dark:text-gray-400 ${
                            completed && "text-gray-400 line-through"
                        }`}
                    >
                        {title}
                    </p>
                    <button
                        className="flex-none"
                        onClick={() => archiveNote(id_note)}
                    >
                        {archived ? <IconUnarchive /> : <IconArchive />}
                    </button>

                    <button
                        className="flex-none"
                        onClick={() => removeNote(id_note)}
                    >
                        <IconCross />
                    </button>
                </article>
            </>
        );
    },
);

export default NoteItem;
