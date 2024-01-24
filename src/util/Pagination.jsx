/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <nav aria-label="Page navigation" className="mt-4 flex justify-center pt-4">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-default"
          >
            Anterior
          </button>
        </li>
        {[...Array(totalPages).keys()].map((page) => (
          <li key={page + 1}>
            <button
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              className={`${
                currentPage === page ? "bg-blue-50 text-blue-600" : ""
              } flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
            >
              {page + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`${
              currentPage === totalPages - 1 ? "pointer-events-none" : ""
            } flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
