import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Home from "./pages/Home/Home";
import MultiStepForm from "./pages/Forms/MultiStepForm";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/multistep" element={<MultiStepForm />} />
      </Route>
    )
  );

  return (
    <div className="font-body">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
