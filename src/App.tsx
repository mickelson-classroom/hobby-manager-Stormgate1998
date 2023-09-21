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
      element: <ErrorBoundary fallback={<ErrorFeedback/>}><Home /></ErrorBoundary>,
    },
    {
      path: "/weapon/:weaponId",
      element: <ErrorBoundary fallback={<ErrorFeedback/>}><WeaponDetailPage /></ErrorBoundary>,
    },
    {
      path: "/error",
      element: <ErrorBoundary fallback={<ErrorFeedback/>}><ErrorPage /></ErrorBoundary>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
