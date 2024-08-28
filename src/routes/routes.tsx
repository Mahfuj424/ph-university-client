import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { RouteGenerator } from "../utils/RouteGenerators";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: RouteGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: RouteGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: RouteGenerator(studentPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
