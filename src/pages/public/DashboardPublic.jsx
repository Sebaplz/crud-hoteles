import { useEffect } from "react";
import Loading from "../../util/Loading";
import Error from "../../util/Error";
import useApiData from "../../hooks/useApiData";
import AdvertisementList from "../../components/AdvertisementList";

export default function DashboardPublic() {
  const { data, isLoading, error, /* currentPage, totalPages, */ fetchData } =
    useApiData();

  /* const handlePageChange = (newPage) => {
    fetchData(import.meta.env.VITE_URL_ALLADVERTISEMENTS, newPage);
  }; */

  useEffect(() => {
    fetchData(import.meta.env.VITE_URL_ALLADVERTISEMENTS);
  }, []);

  return (
    <>
      <main className="mx-auto max-w-5xl pb-10 pt-40">
        {isLoading && <Loading />}
        {!isLoading && (
          <>
            {error ? (
              <Error error={error} />
            ) : (
              <>
                <AdvertisementList advertisement={data} />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
