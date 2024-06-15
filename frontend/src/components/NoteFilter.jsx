const NoteFilter = ({ changeFilter, filter }) => {
    return (
        <section className="container mx-auto">
            <div className="mt-8 flex justify-center gap-4 rounded-md bg-white p-4 transition-all duration-500 dark:bg-gray-800">
                <button
                    className={`${
                        filter === "all"
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-blue-500"
                    } transition-all duration-300`}
                    onClick={() => changeFilter("all")}
                >
                    All
                </button>
                <button
                    className={`${
                        filter === "active"
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-blue-500"
                    } transition-all duration-300`}
                    onClick={() => changeFilter("active")}
                >
                    Active
                </button>
                <button
                    className={`${
                        filter === "completed"
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-blue-500"
                    } transition-all duration-300`}
                    onClick={() => changeFilter("completed")}
                >
                    Completed
                </button>
                <button
                    className={`${
                        filter === "archived"
                            ? "text-blue-500"
                            : "text-gray-400 hover:text-blue-500"
                    } transition-all duration-300`}
                    onClick={() => changeFilter("archived")}
                >
                    Archived
                </button>
            </div>
        </section>
    );
};

export default NoteFilter;
