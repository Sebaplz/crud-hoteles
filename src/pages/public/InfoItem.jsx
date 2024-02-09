import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../util/Loading";
import { IconArrowLeft } from "@tabler/icons-react";
import Error from "../../util/Error";

export default function InfoItem() {
  const [advertisement, setAdvertisement] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchAdvertisement = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_GETADVERTISEMENT}/${id}`,
      );
      if (!response.ok) {
        setError(response.text);
      }
      const data = await response.json();
      setAdvertisement(data);
    } catch (error) {
      setError("No se pudo cargar el lugar seleccionado!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisement();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {error ? (
            <Error error={error} />
          ) : (
            <main className="mx-auto max-w-5xl px-7 pt-36 lg:pt-40">
              <div className="flex pb-4">
                <Link to={"/"}>
                  <IconArrowLeft color="#e02957" size={30} />
                </Link>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={advertisement.imageUrl}
                  alt={`Imagen del lugar ${advertisement.address}`}
                  className="h-64 w-80 rounded-lg object-cover lg:h-[400px] lg:w-[400px]"
                />
                <section className="w-full">
                  <h1 className="text-xl font-semibold">
                    {advertisement.address}
                  </h1>
                  <h2>
                    {advertisement.numOfPersons} huéspedes -{" "}
                    {advertisement.numOfBedrooms} habitaciones -{" "}
                    {advertisement.numOfBathrooms} baños
                  </h2>
                  <h3>
                    Precio por noche:{" "}
                    <span className="font-bold">
                      {advertisement.pricePerNight.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </span>
                  </h3>
                  <h4>
                    Estado:{" "}
                    <span
                      className={`${advertisement.status != "Disponible" ? "text-red-500" : "text-green-600"} font-bold`}
                    >
                      {advertisement.status}
                    </span>
                  </h4>
                </section>
                <section className="w-full">
                  <h2 className="text-left">
                    Anfitrión: {advertisement.firstName}{" "}
                    {advertisement.lastName}
                  </h2>
                  <h3>Dirección: {advertisement.addressExtended}</h3>
                </section>
                <div className="h-[1px] w-full bg-gray-600"></div>
                <section className="w-full pb-10">
                  <h2>Descripción: </h2>
                  <p>{advertisement.description}</p>
                </section>
              </div>
            </main>
          )}
        </>
      )}
    </>
  );
}
