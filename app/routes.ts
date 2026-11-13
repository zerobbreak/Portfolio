import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("globe-preview", "routes/globe-preview.tsx"),
] satisfies RouteConfig;
