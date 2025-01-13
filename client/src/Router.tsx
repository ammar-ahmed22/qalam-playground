import { RouterProvider, createBrowserRouter } from "react-router";
import App from "./App";
import Picture from "./components/Picture";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/picture",
    element: <Picture />,
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
