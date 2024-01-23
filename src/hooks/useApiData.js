import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

const useApiData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const { email } = useAuth();

  const fetchData = async (url, page = 0, size = 5) => {
    const urlBase = `${url}?page=${page}&size=${size}&email=${email}`;

    try {
      const response = await fetch(urlBase);
      const data = await response.json();
      setData(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageable.pageNumber);
    } catch (error) {
      setError("No se pudo obtener los datos!");
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, currentPage, totalPages, fetchData };
};

export default useApiData;
