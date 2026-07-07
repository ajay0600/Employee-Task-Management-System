function Pagination({
    page,
    pageSize,
    totalRecords,
    onPageChange
}) {

    const totalPages = Math.ceil(totalRecords / pageSize);

    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (

        <div className="d-flex justify-content-between align-items-center mt-3">

            <div>

                <strong>
                    Total Records : {totalRecords}
                </strong>

            </div>

            <nav>

                <ul className="pagination mb-0">

                    <li
                        className={
                            page === 1
                                ? "page-item disabled"
                                : "page-item"
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page - 1)}
                        >
                            Previous
                        </button>
                    </li>

                    {pages.map((number) => (

                        <li
                            key={number}
                            className={
                                page === number
                                    ? "page-item active"
                                    : "page-item"
                            }
                        >

                            <button
                                className="page-link"
                                onClick={() => onPageChange(number)}
                            >
                                {number}
                            </button>

                        </li>

                    ))}

                    <li
                        className={
                            page === totalPages
                                ? "page-item disabled"
                                : "page-item"
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page + 1)}
                        >
                            Next
                        </button>
                    </li>

                </ul>

            </nav>

        </div>

    );

}

export default Pagination;