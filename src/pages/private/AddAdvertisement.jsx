import { IconArrowLeft, IconCirclePlus } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import ToastError from "../../util/ToastError";
import Toast from "../../util/Toast";

const AddAdvertisement = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { token, email } = useAuth();

  const onSubmit = async (data) => {
    data.address += ", Chile";
    data.email = email;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_CREATEADVERTISEMENT}`,
        options,
      );

      if (response.ok) {
        const responseData = await response.json();
        setMessage(responseData.message);
        setError(responseData.error);
        reset();
        setTimeout(() => {
          setMessage(null);
          setError(null);
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error(errorData);

        setError("Error al agregar el Alojamiento");
      }
    } catch (error) {
      setError("Error en la solicitud");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pt-36 lg:px-0 lg:pt-40">
      {message && <Toast message={message} />}
      {error && <ToastError message={error} />}
      <div className="mb-4 flex lg:mb-0">
        <Link to={"/"}>
          <IconArrowLeft color="#e02957" size={30} />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md">
        <div className="flex w-full justify-between gap-2">
          <div className="w-full">
            <label
              htmlFor="address"
              className="mb-1 block font-semibold text-gray-700"
            >
              Comuna
            </label>
            <input
              {...register("address", {
                required: "La comuna no puede estar vacia!",
                minLength: {
                  value: 3,
                  message: "La comuna debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 25,
                  message: "La comuna no puede tener más de 25 caracteres",
                },
              })}
              id="address"
              maxLength={25}
              placeholder="Conchalí"
              className="w-full rounded-lg border p-2"
            />
            <p className="mb-5 text-red-500">{errors.address?.message}</p>
          </div>
          <div className="w-full">
            <label
              htmlFor="country"
              className="mb-1 block font-semibold text-gray-700"
            >
              País
            </label>
            <input
              {...register("country")}
              id="country"
              value="Chile"
              placeholder="Chile"
              disabled
              className="w-full rounded-lg border p-2"
            />
            <p className="mb-5 text-red-500">{errors.country?.message}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="addressExtended"
            className="mb-1 block font-semibold text-gray-700"
          >
            Dirección:
          </label>
          <input
            {...register("addressExtended", {
              required: "La dirección no puede estar vacía",
              minLength: {
                value: 10,
                message: "La dirección debe tener al menos 10 caracteres",
              },
              maxLength: {
                value: 60,
                message: "La dirección no puede tener más de 60 caracteres",
              },
            })}
            id="addressExtended"
            maxLength={60}
            placeholder="Navidad, Calle Inventada, 282"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.addressExtended?.message}</p>
        </div>
        <div className="flex w-full justify-between gap-2">
          <div className="w-full">
            <label className="mb-1 block font-semibold text-gray-700">
              Cantidad de Personas
            </label>
            <select
              {...register("numOfPersons", {
                required: "Selecciona la cantidad de personas",
              })}
              className="w-full rounded-lg border p-2"
            >
              <option value="" disabled hidden>
                Selecciona la cantidad de personas
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <p className="mb-5 text-red-500">{errors.numOfPersons?.message}</p>
          </div>
          <div className="w-full">
            <label className="mb-1 block font-semibold text-gray-700">
              Cantidad de Habitaciones
            </label>
            <select
              {...register("numOfBedrooms", {
                required: "Selecciona la cantidad de habitaciones",
              })}
              className="w-full rounded-lg border p-2"
            >
              <option value="" disabled hidden>
                Selecciona la cantidad de habitaciones
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <p className="mb-5 text-red-500">{errors.numOfBedrooms?.message}</p>
          </div>
        </div>
        <div className="flex w-full justify-between gap-2">
          <div className="w-full">
            <label className="mb-1 block font-semibold text-gray-700">
              Cantidad de Baños
            </label>
            <select
              {...register("numOfBathrooms", {
                required: "Selecciona la cantidad de baños",
              })}
              className="w-full rounded-lg border p-2"
            >
              <option value="" disabled hidden>
                Selecciona la cantidad de baños
              </option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <p className="mb-5 text-red-500">
              {errors.numOfBathrooms?.message}
            </p>
          </div>
          <div className="w-full">
            <label className="mb-1 block font-semibold text-gray-700">
              Disponibilidad
            </label>
            <select
              {...register("status", {
                required: "Selecciona la disponibilidad",
              })}
              className="w-full rounded-lg border p-2"
            >
              <option value="" disabled hidden>
                Selecciona la disponibilidad
              </option>
              {["Disponible", "Ocupada"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <p className="mb-5 text-red-500">{errors.status?.message}</p>
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="mb-1 block font-semibold text-gray-700"
          >
            Descripción:
          </label>
          <textarea
            {...register("description", {
              required: "La descripción no puede estar vacía",
            })}
            id="description"
            placeholder="lorem ipsum..."
            className="w-full rounded-lg border p-2"
            maxLength={200}
          />
          <p className="mb-5 text-red-500">{errors.description?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="pricePerNight"
            className="mb-1 block font-semibold text-gray-700"
          >
            Precio (Por Noche):
          </label>
          <input
            {...register("pricePerNight", {
              required: "El precio no puede estar vacío",
              pattern: {
                value: /^[0-9]+$/,
                message: "Ingresa solo números en el campo de pginas",
              },
            })}
            id="pricePerNight"
            placeholder="100.000"
            className="w-full rounded-lg border p-2"
            type="number"
          />
          <p className="text-red-500">{errors.pricePerNight?.message}</p>
        </div>
        <div className="mb-5">
          <label
            htmlFor="imageUrl"
            className="mb-1 block font-semibold text-gray-700"
          >
            URL de la Imagen:
          </label>
          <input
            {...register("imageUrl", {
              required: "Imagen no puede estar vacía",
            })}
            id="imageUrl"
            placeholder="url/imagen"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.imageUrl?.message}</p>
        </div>
        <button
          type="submit"
          className="mb-8 flex items-center gap-1 rounded-md bg-[#e02957] p-2 font-semibold text-white transition-transform hover:scale-105"
        >
          <IconCirclePlus color="white" size={20} />
          Agregar Alojamiento
        </button>
      </form>
    </main>
  );
};

export default AddAdvertisement;
