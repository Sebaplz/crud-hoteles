import { useEffect } from "react";
import Loading from "../../util/Loading";
import Error from "../../util/Error";
import useApiData from "../../hooks/useApiData";
import AdvertisementList from "../../components/AdvertisementList";
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";

export default function DashboardPublic() {
  const { data, isLoading, error, /* currentPage, totalPages, */ fetchData } =
    useApiData();
  const { userRol } = useAuth();

  /* const handlePageChange = (newPage) => {
    fetchData(import.meta.env.VITE_URL_ALLADVERTISEMENTS, newPage);
  }; */

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
                <AdvertisementList advertisement={data} />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
