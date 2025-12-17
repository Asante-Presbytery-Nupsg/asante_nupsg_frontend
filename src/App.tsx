import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Home from "./pages/Home/Home";
import MultiStepForm from "./pages/Forms/MultiStepForm";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashLayout from "./dashboard/layouts";
import DashHome from "./dashboard/main/Home";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {},
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<MultiStepForm />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<DashHome />} />
        </Route>
      </>
    )
  );

  return (
    <div className="font-body">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
