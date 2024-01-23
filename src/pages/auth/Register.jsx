import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleAuthentication, error } = useUser();

  const onSubmit = (data) => {
    handleAuthentication(data, "register");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="m-5 w-full rounded-lg bg-white p-5 shadow-lg md:w-[450px]">
        <div className="flex justify-end p-2">
          <img src="logo_acl.webp" alt="Logo" className="w-20" />
        </div>
        <h1 className="mb-8 text-center text-4xl font-semibold italic">
          Reserva de Hoteles
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="username"
            className="mb-1 block font-semibold text-gray-700"
          >
            Nombre de Usuario
          </label>
          <input
            {...register("username", {
              required: "El nombre de usuario no puede estar vacio!",
              minLength: {
                value: 4,
                message:
                  "La nombre de usuario debe tener al menos 4 caracteres",
              },
              maxLength: {
                value: 15,
                message:
                  "La nombre de usuario no puede tener más de 15 caracteres",
              },
            })}
            maxLength={15}
            placeholder="Nombre de Usuario"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.username?.message}</p>
          <label
            htmlFor="email"
            className="mb-1 block font-semibold text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            {...register("email", {
              required: "El correo electrónico no puede estar vacio!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Debe ser un correo electrónico valido!",
              },
            })}
            autoComplete="email"
            placeholder="email@email.com"
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.email?.message}</p>
          <label
            htmlFor="password"
            className="mb-1 block font-semibold text-gray-700"
          >
            Contraseña
          </label>
          <input
            {...register("password", {
              required: "La contraseña no puede estar vacía!",
              minLength: {
                value: 4,
                message: "La contraseña debe tener al menos 4 caracteres",
              },
              maxLength: {
                value: 15,
                message: "La contraseña no puede tener más de 15 caracteres",
              },
            })}
            type="Password"
            placeholder="********"
            maxLength={15}
            className="w-full rounded-lg border p-2"
          />
          <p className="mb-5 text-red-500">{errors.password?.message}</p>
          <button
            className="h-12 w-full rounded-lg bg-[#e02957] font-bold text-white"
            type="submit"
          >
            Crear Cuenta
          </button>
          <p className="mb-5 text-red-500">{error && <span>{error}</span>}</p>
        </form>
        <div className="flex justify-between">
          <Link
            to={"/"}
            className="text-center font-bold text-black transition-colors hover:text-[#e02957] hover:underline"
          >
            Volver al inicio
          </Link>
          <Link
            to={"/login"}
            className="text-center font-bold text-black transition-colors hover:text-[#e02957] hover:underline"
          >
            Ya tengo una cuenta!
          </Link>
        </div>
      </section>
    </main>
  );
}
