import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
// import { ThemeProvider } from "./contexts/ThemeProvider";
import Layout from "./components/dashboard/Layouts";
import Dashboard from "./dashboard/dashboard";
import Home from "./pages/Home/Home";
function App() {
  return (
    <>
      {/* <ThemeProvider defaultTheme="" storageKey="vite-ui-theme"> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
