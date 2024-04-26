import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const url = "http://localhost:7777/api/auth/signup";
  const signUp = async (data) => {
    console.log(data);
    try {
      const res = await axios.post(url, data);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const password = watch("password");

  return (
    <div>
      <div className="flex flex-col items-center min-w-96 mx-auto m-1 mt-10">
        <h1 className="">Sign Up for Chat app</h1>
        <form onSubmit={handleSubmit(signUp)}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full Name is required",
              })}
            />
          </label>
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
              })}
            />
          </label>
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
          </label>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
          </label>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
              Boy or Girl ??
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <label>
                  <input
                    type="radio"
                    value="boy"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Boy
                </label>
              </li>
              <li>
                <label>
                  <input
                    type="radio"
                    value="girl"
                    {...register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  Girl
                </label>
              </li>
            </ul>
          </div>
          {errors.gender && (
            <p className="text-red-500">{errors.gender.message}</p>
          )}
          <div className="flex justify-around items-center p-6">
            <button type="submit" className="btn btn-primary btn-active">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
