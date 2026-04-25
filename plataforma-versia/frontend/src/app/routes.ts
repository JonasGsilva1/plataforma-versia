import { createBrowserRouter } from "react-router";
import { ComponentType, createElement } from "react";
import { Index } from "./pages/Index";
import { LoginDesktop } from "./pages/LoginDesktop";
import { LoginMobile } from "./pages/LoginMobile";
import { Dashboard } from "./pages/Dashboard";
import { Courses } from "./pages/Courses";
import { Course } from "./pages/Course";
import { Lesson } from "./pages/Lesson";
import { Certificate } from "./pages/Certificate";
import { Subscription } from "./pages/Subscription";
import { Profile } from "./pages/Profile";
import { PrivateRoute } from "./components/PrivateRoute";

const protect = (Component: ComponentType) =>
  () => createElement(PrivateRoute, null, createElement(Component));

export const router = createBrowserRouter([
  { path: "/", Component: Index },
  { path: "/login-desktop", Component: LoginDesktop },
  { path: "/login-mobile", Component: LoginMobile },
  { path: "/dashboard", Component: protect(Dashboard) },
  { path: "/courses", Component: protect(Courses) },
  { path: "/course/:id", Component: protect(Course) },
  { path: "/lesson/:id", Component: protect(Lesson) },
  { path: "/certificate", Component: protect(Certificate) },
  { path: "/subscription", Component: protect(Subscription) },
  { path: "/profile", Component: protect(Profile) },
]);
