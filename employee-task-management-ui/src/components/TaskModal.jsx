import { useEffect, useState } from "react";

function TaskModal({
    show,
    onClose,
    onSave,
    isEdit,
    task,
    employees
}) {

    const [taskForm, setTaskForm] = useState({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        startDate: "",
        dueDate: "",
        employeeId: ""
    });

    useEffect(() => {

        if (isEdit && task) {

            setTaskForm({

                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                startDate: task.startDate.substring(0, 10),
                dueDate: task.dueDate.substring(0, 10),
                employeeId: task.employeeId

            });

        }
        else {

            setTaskForm({

                title: "",
                description: "",
                priority: "Medium",
                status: "Pending",
                startDate: "",
                dueDate: "",
                employeeId: ""

            });

        }

    }, [task, isEdit]);

    const handleChange = (e) => {

        setTaskForm({

            ...taskForm,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = () => {

        if (
            taskForm.title.trim() === "" ||
            taskForm.description.trim() === "" ||
            taskForm.employeeId === ""
        ) {

            alert("Please fill all required fields.");

            return;

        }

        onSave(taskForm);

    };

    if (!show) return null;

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {isEdit
                                ? "Edit Task"
                                : "Add Task"}

                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label className="form-label">
                                Title
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={taskForm.title}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                name="description"
                                value={taskForm.description}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Employee
                                </label>

                                <select
                                    className="form-select"
                                    name="employeeId"
                                    value={taskForm.employeeId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map(employee => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >
                                            {employee.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Priority
                                </label>

                                <select
                                    className="form-select"
                                    name="priority"
                                    value={taskForm.priority}
                                    onChange={handleChange}
                                >

                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>

                                </select>

                            </div>

                        </div>

                        {isEdit && (

                            <div className="mt-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={taskForm.status}
                                    onChange={handleChange}
                                >

                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>

                                </select>

                            </div>

                        )}

                        <div className="row mt-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Start Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="startDate"
                                    value={taskForm.startDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6">

                                <label className="form-label">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="dueDate"
                                    value={taskForm.dueDate}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            {isEdit
                                ? "Update Task"
                                : "Save Task"}
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TaskModal;