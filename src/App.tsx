import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Admin } from "./pages/admin";
import { Login } from "./pages/login";
import { Network } from "./pages/networks";
import { Private } from "./routes/private";
import { ErrorPage } from "./pages/error";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/admin",
    element: (
      <Private>
        <Admin></Admin>
      </Private>
    ),
  },
  {
    path: "/admin/social",
    element: (
      <Private>
        <Network></Network>
      </Private>
    ),
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export { router };
