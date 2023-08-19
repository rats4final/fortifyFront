import Button from "../../../components/form/button";
import { useForm } from "react-hook-form";
import api from "../../../utils/api";
import { logIn } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    api()
      .get("/sanctum/csrf-cookie")
      .then(() => {
        api()
          .post("/api/login", data)
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.errors);
            } else {
              logIn();
              nav("/");
            }
          })
          .catch((errors) => console.log(errors.response.data.message));
      });
  };

  useEffect(() => {
    setLoading(true);
    api()
      .get("api/user")
      .then((response) => {
        if (response) {
          console.log(response);
          nav("/");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      //show loading bar
      <>
        <h1>You are being redirected!</h1>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </>
    );
  } else {
    return (
      <>
        <main className="flex items-center justify-center h-screen bg-house bg-cover">
          <div id="loginCard" className="shadow-lg bg-white rounded-lg p-6">
            <h1 id="loginCardTitle" className="text-center text-2xl">
              Login
            </h1>
            <form
              className="flex flex-col gap-y-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="email">Email</label>
              <input
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                placeholder="example@email.com"
                type="email"
                name="email"
                id="email"
                {...register("email", {
                  required: "This field is required",
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
              <label htmlFor="password">Password</label>
              <input
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                type="password"
                name="password"
                id="password"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "The minimun length is 5",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <div className="flex gap-x-4">
                <div>
                  <label htmlFor="remember">Remember Me</label>
                  <input
                    className="ml-2"
                    type="checkbox"
                    name="remember"
                    id="remember"
                    {...register("remember")}
                  />
                </div>
                <Button type="submit" className="font-bold text-white">
                  Log In
                </Button>
              </div>
            </form>
          </div>
        </main>
      </>
    );
  }
}
