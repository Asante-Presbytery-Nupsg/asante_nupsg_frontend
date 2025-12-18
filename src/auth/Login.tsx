import useAuth from "@/hooks/useAuth";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setErrorMessage("");
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data?.message || "Invalid credentials.");
      } else {
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="border rounded-xs border-gray-400 shadow-sm w-md px-6 py-8">
        <h2 className="text-xl font-semibold text-center mb-8">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xs text-sm">
              {errorMessage}
            </div>
          )}
          <div>
            <label className="block text-sm tracking-wider mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 rounded-xs p-1.5 w-full"
            />
          </div>
          <div>
            <label className="block text-sm tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-300 rounded-xs p-1.5 w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-[13px] text-gray-700">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2 h-4 w-4"
              />{" "}
              Remember Me
            </label>
            <Link
              to="/forgot-password"
              title="Forgot Password"
              className="text-blue-700 text-[13px] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 bg-blue-700 hover:bg-blue-800 rounded-xs text-white text-sm disabled:opacity-50"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
