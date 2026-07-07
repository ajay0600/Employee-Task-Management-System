import { useEffect, useState } from "react";
import api from "../services/api";

import TaskSearch from "../components/TaskSearch";
import TaskTable from "../components/TaskTable";
import Pagination from "../components/Pagination";
import TaskModal from "../components/TaskModal";
import Navbar from "../components/Navbar";
function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {

        getEmployees();
        getTasks();

    }, [page]);

    const token =
        localStorage.getItem("token") ||
        sessionStorage.getItem("token");

    const getEmployees = async () => {

        try {

            const response = await api.get("/Employees", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setEmployees(response.data.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const getTasks = async () => {

        try {

            const response = await api.get("/Tasks", {

                params: {

                    search,
                    sortBy,
                    sortOrder,
                    page,
                    pageSize

                },

                headers: {

                    Authorization: `Bearer ${token}`

                }

            });

            setTasks(response.data.data);
            setTotalRecords(response.data.totalRecords);

        }
        catch (error) {

            console.log(error);

        }

    };

    const openAddModal = () => {

        setIsEdit(false);
        setSelectedTask(null);
        setShowModal(true);

    };

    const openEditModal = (task) => {

        setIsEdit(true);
        setSelectedTask(task);
        setShowModal(true);

    };

    const closeModal = () => {

        setShowModal(false);

    };

    const saveTask = async (taskData) => {

        try {

            if (isEdit) {

                await api.put(

                    `/Tasks/${selectedTask.id}`,

                    taskData,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                alert("Task Updated Successfully");

            }

            else {

                await api.post(

                    "/Tasks",

                    taskData,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                alert("Task Added Successfully");

            }

            closeModal();
            getTasks();

        }

        catch (error) {

            console.log(error);
            alert("Something went wrong");

        }

    };

    const deleteTask = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmDelete)
            return;

        try {

            await api.delete(

                `/Tasks/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Task Deleted Successfully");

            getTasks();

        }

        catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (id, status) => {

        try {

            await api.put(

                `/Tasks/${id}/status`,

                {

                    status

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            getTasks();

        }

        catch (error) {

            console.log(error);

        }

    };
        return (
          <>

        <Navbar />
        <div className="container mt-4">

            <h2 className="mb-4">
                Task Management
            </h2>

            <TaskSearch

                search={search}
                setSearch={setSearch}

                sortBy={sortBy}
                setSortBy={setSortBy}

                sortOrder={sortOrder}
                setSortOrder={setSortOrder}

                onSearch={() => {

                    setPage(1);
                    getTasks();

                }}

                onAddTask={openAddModal}

            />

            <TaskTable

                tasks={tasks}

                onEdit={openEditModal}

                onDelete={deleteTask}

                onStatusChange={updateStatus}

            />

            <Pagination

                page={page}

                pageSize={pageSize}

                totalRecords={totalRecords}

                onPageChange={(newPage) => {

                    setPage(newPage);

                }}

            />

            <TaskModal

                show={showModal}

                onClose={closeModal}

                onSave={saveTask}

                isEdit={isEdit}

                task={selectedTask}

                employees={employees}

            />

        </div>
      </>
    );

}

export default Tasks;