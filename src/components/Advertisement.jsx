import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

/* eslint-disable react/prop-types */
export default function Advertisement({ item, setSelectedItem, setOpenModal }) {
  const { userRol } = useAuth();
  const formattedPrice = item.pricePerNight.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  return (
    <li className="flex h-[300px] flex-col items-center justify-center rounded-lg">
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
          {formattedPrice}
          <span className="font-normal"> la noche</span>
        </h3>
        <div className="flex items-center justify-between gap-4">
          <h4
            className={`font-bold ${item.status != "Disponible" ? "text-red-500" : "text-green-600"}`}
          >
            {item.status}
          </h4>
          {userRol === "ADMIN" && (
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
      </article>
    </li>
  );
}
