function TaskTable({
    tasks,
    onEdit,
    onDelete,
    onStatusChange
}) {

    return (

        <table className="table table-bordered table-hover">

            <thead className="table-dark">

                <tr>

                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Employee</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th width="180">Actions</th>

                </tr>

            </thead>

            <tbody>

                {tasks.length === 0 ? (

                    <tr>

                        <td
                            colSpan="9"
                            className="text-center"
                        >
                            No Tasks Found
                        </td>

                    </tr>

                ) : (

                    tasks.map((task) => (

                        <tr key={task.id}>

                            <td>{task.id}</td>

                            <td>{task.title}</td>

                            <td>{task.description}</td>

                            <td>

                                <span
                                    className={
                                        task.priority === "High"
                                            ? "badge bg-danger"
                                            : task.priority === "Medium"
                                            ? "badge bg-warning text-dark"
                                            : "badge bg-success"
                                    }
                                >
                                    {task.priority}
                                </span>

                            </td>

                            <td>

                                <select
                                    className="form-select form-select-sm"
                                    value={task.status}
                                    onChange={(e) =>
                                        onStatusChange(
                                            task.id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                </select>

                            </td>

                            <td>{task.employeeName}</td>

                            <td>
                                {new Date(
                                    task.startDate
                                ).toLocaleDateString()}
                            </td>

                            <td>
                                {new Date(
                                    task.dueDate
                                ).toLocaleDateString()}
                            </td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => onEdit(task)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => onDelete(task.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))

                )}

            </tbody>

        </table>

    );

}

export default TaskTable;