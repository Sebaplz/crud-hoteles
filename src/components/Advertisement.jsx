import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Advertisement({ item }) {
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
        <h4
          className={`font-bold ${item.status != "Disponible" ? "text-red-500" : "text-green-600"}`}
        >
          {item.status}
        </h4>
      </article>
    </li>
  );
}
