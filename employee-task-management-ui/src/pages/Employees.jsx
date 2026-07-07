import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Employees() {

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("");

    const [sortOrder, setSortOrder] = useState("asc");

    const [totalRecords, setTotalRecords] = useState(0);

    const [page, setPage] = useState(1);

    const [pageSize] = useState(10);

    const totalPages = Math.ceil(totalRecords / pageSize);

    const [showModal, setShowModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

const [employeeForm, setEmployeeForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: ""
});



    useEffect(() => {
        getEmployees();
    }, [page]);

    const getEmployees = async () => {

        try {

            const token =
                localStorage.getItem("token") ||
                sessionStorage.getItem("token");

            const response = await api.get("/Employees", {

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

            setEmployees(response.data.data);

            setTotalRecords(response.data.totalRecords);

        }
        catch (error) {

            console.log(error);

        }

    };

    const nextPage = () => {

        if (page < totalPages) {

            setPage(page + 1);

        }

    };

    const previousPage = () => {

        if (page > 1) {

            setPage(page - 1);

        }

    };

    const searchEmployees = () => {

        setPage(1);

        getEmployees();

    };

    const sortEmployees = () => {

        setPage(1);

        getEmployees();

    };

    const handleChange = (e) => {

    const { name, value } = e.target;

    setEmployeeForm({
        ...employeeForm,
        [name]: value
    });

};

const saveEmployee = async () => {

    try {

        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        if (isEdit) {

            await api.put(

                `/Employees/${selectedEmployeeId}`,

                employeeForm,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Employee Updated Successfully");

        }
        else {

            await api.post(

                "/Employees",

                employeeForm,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Employee Added Successfully");

        }

        setShowModal(false);

        setIsEdit(false);

        setSelectedEmployeeId(null);

        setEmployeeForm({

            name: "",
            email: "",
            department: "",
            designation: ""

        });

        getEmployees();

    }
    catch (error) {

        console.log(error);

        alert("Operation Failed");

    }

};
const editEmployee = (employee) => {

    setIsEdit(true);

    setSelectedEmployeeId(employee.id);

    setEmployeeForm({

        name: employee.name,
        email: employee.email,
        department: employee.department,
        designation: employee.designation

    });

    setShowModal(true);

};

const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const token =
            localStorage.getItem("token") ||
            sessionStorage.getItem("token");

        await api.delete(`/Employees/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert("Employee Deleted Successfully");

        getEmployees();

    }
    catch (error) {

        console.log(error);

        alert("Unable to delete employee");

    }

};

        return (
             <>

        <Navbar />
        <div className="container mt-4">

            <h2 className="mb-4">Employee Management</h2>

            {/* Search */}

            <div className="row mb-3">

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-success w-100"
                        onClick={searchEmployees}
                    >
                        Search
                    </button>

                </div>

                <div className="col-md-3">

                    <button
                        className="btn btn-primary w-100"
                        onClick={() => {

    setIsEdit(false);

    setSelectedEmployeeId(null);

    setEmployeeForm({

        name: "",
        email: "",
        department: "",
        designation: ""

    });

    setShowModal(true);

}}
                    >
                        Add Employee
                    </button>

                </div>

            </div>

            {/* Sorting */}

            <div className="row mb-3">

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="name">Name</option>
                        <option value="department">Department</option>
                        <option value="designation">Designation</option>
                    </select>

                </div>

                <div className="col-md-3">

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
                        className="btn btn-secondary w-100"
                        onClick={sortEmployees}
                    >
                        Sort
                    </button>

                </div>

            </div>

            {/* Table */}

            <table className="table table-bordered table-hover">

                <thead className="table-dark">

                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th width="170">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {employees.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >
                                No Employees Found
                            </td>

                        </tr>

                    ) : (

                        employees.map((employee) => (

                            <tr key={employee.id}>

                                <td>{employee.id}</td>

                                <td>{employee.name}</td>

                                <td>{employee.email}</td>

                                <td>{employee.department}</td>

                                <td>{employee.designation}</td>

                                <td>

                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editEmployee(employee)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteEmployee(employee.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

            {/* Footer */}

            <div className="d-flex justify-content-between align-items-center">

                <div>

                    <strong>Total Records :</strong> {totalRecords}

                </div>

                <div>

                    <button
                        className="btn btn-outline-primary me-2"
                        onClick={previousPage}
                        disabled={page === 1}
                    >
                        Previous
                    </button>

                    <span className="me-2">

                        Page {page} of {totalPages || 1}

                    </span>

                    <button
                        className="btn btn-outline-primary"
                        onClick={nextPage}
                        disabled={page === totalPages || totalPages === 0}
                    >
                        Next
                    </button>

                </div>

            </div>
            {/* Add Employee Modal */}

{showModal && (
    <>
        <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
    {isEdit ? "Edit Employee" : "Add Employee"}
</h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label className="form-label">
                                Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={employeeForm.name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={employeeForm.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Department
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="department"
                                value={employeeForm.department}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Designation
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="designation"
                                value={employeeForm.designation}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-primary"
                            onClick={saveEmployee}
                        >
                            {isEdit ? "Update Employee" : "Save Employee"}
                        </button>

                    </div>

                </div>

            </div>
        </div>
    </>
)}

        </div>
        </>
    );

}

export default Employees;
