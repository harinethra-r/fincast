import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLayout } from "@/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Forecaster from "@/pages/Forecaster";
import Horizon from "@/pages/Horizon";
import Scenarios from "@/pages/Scenarios";
import Sky from "@/pages/Sky";
import StormRisk from "@/pages/StormRisk";
import StormWarnings from "@/pages/StormWarnings";
import WeatherProfile from "@/pages/WeatherProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "sky", element: <Sky /> },
      { path: "storm-risk", element: <StormRisk /> },
      { path: "scenarios", element: <Scenarios /> },
      { path: "storm-warnings", element: <StormWarnings /> },
      { path: "horizon", element: <Horizon /> },
      { path: "weather-profile", element: <WeatherProfile /> },
      { path: "assessment", element: <Navigate to="/weather-profile" replace /> },
      { path: "forecaster", element: <Forecaster /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
