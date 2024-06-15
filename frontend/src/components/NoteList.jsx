import NoteItem from "./NoteItem";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const NoteList = ({ notes, removeNote, archiveNote, updateNote }) => {
    return (
        <>
            <Droppable droppableId="Notes">
                {(droppableProvider) => (
                    <div
                        ref={droppableProvider.innerRef}
                        {...droppableProvider.droppableProps}
                        className="mt-8 overflow-hidden rounded-t-md bg-white transition-all 
                        duration-1000 dark:bg-gray-800 [&>article]:p-4"
                    >
                        {notes.map((note, index) => (
                            <Draggable
                                key={note.id_note}
                                index={index}
                                draggableId={`${note.id_note}`}
                            >
                                {(draggableProvider) => (
                                    <NoteItem
                                        note={note}
                                        removeNote={removeNote}
                                        updateNote={updateNote}
                                        archiveNote={archiveNote}
                                        ref={draggableProvider.innerRef}
                                        {...draggableProvider.dragHandleProps}
                                        {...draggableProvider.draggableProps}
                                    />
                                )}
                            </Draggable>
                        ))}
                        {droppableProvider.placeholder}
                    </div>
                )}
            </Droppable>
        </>
    );
};

export default NoteList;
