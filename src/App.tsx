import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { WeaponDetailPage } from "./pages/weapon/WeaponDetailPage";
import { ErrorPage } from "./pages/error/error";
import ErrorBoundary from "./pages/ErrorBoundary";
import { ErrorFeedback } from "./pages/errorFeedback/errorFeedback";
export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/weapon/:weaponId",
      element: <WeaponDetailPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
  ]);
  return (
    <ErrorBoundary fallback={<ErrorFeedback/>}>
    <div className="App">
      <RouterProvider router={router} />
    </div>
    </ErrorBoundary>
  );
};
