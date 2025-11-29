import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Home from "./pages/Home/Home";
import FormOne from "./pages/Forms/FormOne";
import FormTwo from "./pages/Forms/FormTwo";
import FormThree from "./pages/Forms/FormThree";
import SuccessPage from "./pages/Forms/SuccessPage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="formone" element={<FormOne />} />
        <Route path="formtwo" element={<FormTwo />} />
        <Route path="formthree" element={<FormThree />} />
        <Route path="/success" element={<SuccessPage/>} />
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

