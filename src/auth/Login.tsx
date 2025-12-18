import useAuth from "@/hooks/useAuth";
import { useForm, type SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data.email, data.password, data.rememberMe);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-5">
      <div className="border rounded-xs border-gray-400 shadow-sm w-md px-6 py-8">
        <h2 className="text-xl font-semibold text-center mb-8">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm tracking-wider mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 rounded-xs p-1.5 w-full"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm tracking-wider mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-300 rounded-xs p-1.5 w-full"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-[13px] text-gray-700">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="mr-2 h-4 w-4 accent-blue-700"
              />
              Remember Me
            </label>
            <a
              href="/forgot-password"
              className="text-blue-700 text-[13px] hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2 bg-blue-700 hover:bg-blue-800 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer rounded-xs text-white text-sm disabled:opacity-50"
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
