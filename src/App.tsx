import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import { ThemeProvider } from "./contexts/ThemeProvider";
import Layout from "./components/dashboard/Layouts";
import Dashboard from "./dashboard/dashboard";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
