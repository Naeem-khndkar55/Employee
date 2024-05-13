import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import DashBord from "../components/DashBord/DashBord";
import Employee from "../components/Emoloyee/Employee";

export function AppRoutes() {
  const routes = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/dashbord",
      element: <DashBord />,
    },
    {
      path: "/employee",
      element: <Employee />,
    },
  ]);

  return <RouterProvider router={routes} />;
}
