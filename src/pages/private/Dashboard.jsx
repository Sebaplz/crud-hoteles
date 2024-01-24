import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";
import Loading from "../../util/Loading";
import Error from "../../util/Error";
import Toast from "../../util/Toast";
import ModalPopUp from "../../util/ModalPopUp";
import Pagination from "../../util/Pagination";
import useApiData from "../../hooks/useApiData";

export default function Dashboard() {
  const { data, isLoading, error, currentPage, totalPages, fetchData } =
    useApiData();
  const [message, setMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { token, userRol } = useAuth();

  const optionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handlePageChange = (newPage) => {
    fetchData(
      import.meta.env.VITE_URL_GETALLADVERTISEMENTSBYEMAIL,
      newPage,
      6,
      optionsGet,
    );
  };

  const handleDelete = async (id) => {
    const url = `${import.meta.env.VITE_URL_DELETEADVERTISEMENT}/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setOpenModal(false);
      setMessage(data.message);
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      fetchData(
        import.meta.env.VITE_URL_GETALLADVERTISEMENTSBYEMAIL,
        0,
        6,
        optionsGet,
      );
    }
  };

  useEffect(() => {
    fetchData(
      import.meta.env.VITE_URL_GETALLADVERTISEMENTSBYEMAIL,
      0,
      6,
      optionsGet,
    );
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-10 pb-10 pt-36">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <>
              {message && <Toast message={message} />}
              {userRol == "USER" && (
                <div className="flex justify-end pb-10">
                  <Link
                    to={"/add"}
                    className="rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105 lg:p-3"
                  >
                    Agregar Alojamiento
                  </Link>
                </div>
              )}
              <ul className="mb-8 grid w-full grid-cols-1 items-center justify-center gap-10 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item) => (
                  <li
                    key={item.id}
                    className="flex h-[300px] flex-col items-center justify-center rounded-lg"
                  >
                    <article>
                      <Link to={`/advertisement/${item.id}`}>
                        <img
                          src={item.imageUrl}
                          alt={`Imagen del lugar ${item.address}`}
                          className="h-60 w-72 rounded-lg object-cover"
                        />
                      </Link>
                      <h2 className="w-52 truncate pt-1 text-left text-lg font-medium">
                        {item.address}
                      </h2>
                      <h3 className="w-52 truncate text-left font-bold">
                        {item.pricePerNight.toLocaleString("es-CL", {
                          style: "currency",
                          currency: "CLP",
                        })}
                        <span className="font-normal"> la noche</span>
                      </h3>
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-bold ${item.status != "Disponible" ? "text-red-500" : "text-green-600"}`}
                        >
                          {item.status}
                        </h4>
                        <div className="flex items-center gap-4">
                          <Link
                            to={`/edit/${item.id}`}
                            className="text-blue-500"
                          >
                            Editar
                          </Link>
                          {item.status === "Disponible" && (
                            <button
                              className="rounded-md bg-[#e02957] px-2 py-1 font-semibold text-white transition-transform hover:scale-105"
                              onClick={() => {
                                setSelectedItem(item);
                                setOpenModal(true);
                              }}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
              {totalPages == 0 ? (
                <p className="text-center">No hay Alojamientos</p>
              ) : (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              )}
              {selectedItem && (
                <ModalPopUp
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  item={selectedItem}
                  handleDelete={handleDelete}
                />
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
