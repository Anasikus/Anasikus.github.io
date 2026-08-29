import {
  createBrowserRouter,
} from "react-router-dom";

import App from "./App";

import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

export const router =
  createBrowserRouter([
    {
      path: "/",
      element: <App />,

      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "projects",
          element: <Projects />,
        },

        {
          path: "projects/:id",
          element: <ProjectDetails />,
        },
      ],
    },
  ]);