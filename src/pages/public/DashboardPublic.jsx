import { useEffect, useState } from "react";
import Loading from "../../util/Loading";
import Error from "../../util/Error";
import useApiData from "../../hooks/useApiData";
import AdvertisementList from "../../components/AdvertisementList";
import Pagination from "../../util/Pagination";
import ModalPopUp from "../../util/ModalPopUp";
import { useAuth } from "../../auth/AuthProvider";
import Toast from "../../util/Toast";

export default function DashboardPublic() {
  const [message, setMessage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { token } = useAuth();
  const { data, isLoading, error, currentPage, totalPages, fetchData } =
    useApiData();

  const handlePageChange = (newPage) => {
    fetchData(import.meta.env.VITE_URL_ALLADVERTISEMENTS, newPage);
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
      fetchData(import.meta.env.VITE_URL_ALLADVERTISEMENTS);
    }
  };

  useEffect(() => {
    fetchData(import.meta.env.VITE_URL_ALLADVERTISEMENTS);
  }, []);

  return (
    <>
      <main className="mx-auto max-w-5xl px-10 pb-10 pt-36">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {error ? (
              <Error error={error} />
            ) : (
              <>
                {message && <Toast message={message} />}
                <AdvertisementList
                  advertisement={data}
                  setSelectedItem={setSelectedItem}
                  setOpenModal={setOpenModal}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
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
    </>
  );
}
