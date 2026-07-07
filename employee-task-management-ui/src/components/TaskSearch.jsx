function TaskSearch({
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    onSearch,
    onAddTask
}) {
    return (

        <div className="card mb-3">

            <div className="card-body">

                <div className="row g-2">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Task..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >

                            <option value="">Sort By</option>
                            <option value="title">Title</option>
                            <option value="priority">Priority</option>
                            <option value="status">Status</option>
                            <option value="duedate">Due Date</option>

                        </select>

                    </div>

                    <div className="col-md-2">

                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >

                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>

                        </select>

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-primary w-100"
                            onClick={onSearch}
                        >
                            Search
                        </button>

                    </div>

                    <div className="col-md-2">

                        <button
                            className="btn btn-success w-100"
                            onClick={onAddTask}
                        >
                            Add Task
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default TaskSearch;