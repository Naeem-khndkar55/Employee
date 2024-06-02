import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import DashBord from "../components/DashBord/DashBord.jsx";
import Employee from "../components/Employee/Employee.jsx";
import AddEmployee from "../pages/AddEmployee/AddEmployee.jsx";
import EditEmployee from "../pages/EditEmployee/EditEmployee.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import ProtectedRoute from "../auth/ProtrctedRoute.jsx";
import NotFound from "../pages/NotFound.jsx";
import { UrlProvider } from "../auth/UrlContext.jsx";
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
      element: (
        <ProtectedRoute>
          <DashBord />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          path: "/dashbord/addemployee",
          element: <AddEmployee />,
        },
        {
          path: "/dashbord/employee",
          element: <Employee />,
        },
        {
          path: "/dashbord/editemployee/:id",
          element: <EditEmployee />,
        },
        {
          path: "/dashbord/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <UrlProvider>
      <RouterProvider router={routes} />
    </UrlProvider>
  );
}
