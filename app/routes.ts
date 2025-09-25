import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("build", "routes/build.tsx"),
    route("play", "routes/play.tsx"),
] satisfies RouteConfig;
