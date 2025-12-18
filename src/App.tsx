import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Home from "./pages/Home/Home";
import MultiStepForm from "./pages/Forms/MultiStepForm";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashLayout from "./dashboard/layouts";
import DashHome from "./dashboard/main/Home";
import Login from "./auth/Login";
import RequireAdmin from "./auth/RequireAuth";
import { AuthProvider } from "./contexts/AuthProvider";

// Root component that provides AuthProvider for all routes
function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          { path: "register", element: <MultiStepForm /> },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/unauthorized",
        element: (
          <div className="h-screen flex items-center justify-center px-5 flex-col gap-2">
            <h1 className="text-7xl font-black uppercase">403</h1>
            <p className="text-gray-600 text-center">
              You are not authorized to access this page.
            </p>
            <button
              onClick={() => window.location.replace("/")}
              className="bg-[#C71B00] py-2 px-7 text-white rounded-xs cursor-pointer transition-all duration-300 hover:bg-red-600"
            >
              Go Home
            </button>
          </div>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <RequireAdmin>
            <DashLayout />
          </RequireAdmin>
        ),
        children: [{ index: true, element: <DashHome /> }],
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
