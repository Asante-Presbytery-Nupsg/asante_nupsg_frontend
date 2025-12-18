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
