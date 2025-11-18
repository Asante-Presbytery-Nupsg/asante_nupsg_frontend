import { LoginForm } from "@/components/LoginForm";
import { ModeToggle } from "@/components/ModeToggle";

const Login = () => {
  return (
    <div>
      <div className="absolute top-5 right-20 flex items-center gap-4">
        <p className="font-medium">EN</p>
        <ModeToggle />
      </div>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
