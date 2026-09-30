import {
  createBrowserRouter,
} from "react-router-dom";

import App from "./App";

import Home from "./pages/Home/Home";

/*
 * Главная страница нужна сразу всем посетителям, поэтому
 * остаётся в основном бандле. А вот список проектов и страницу
 * отдельного проекта подгружаем отдельным файлом — по клику,
 * а не вместе с первой загрузкой сайта. Это заметно ускоряет
 * самый первый экран на медленном интернете.
 */
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
          lazy: async () => {
            const { default: Component } = await import(
              "./pages/Projects/Projects"
            );

            return { Component };
          },
        },

        {
          path: "projects/:id",
          lazy: async () => {
            const { default: Component } = await import(
              "./pages/ProjectDetails/ProjectDetails"
            );

            return { Component };
          },
        },

        {
          path: "admin",
          lazy: async () => {
            const { default: Component } = await import(
              "./pages/Admin/Admin"
            );

            return { Component };
          },
        },
      ],
    },
  ]);