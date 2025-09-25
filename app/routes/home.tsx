import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward" },
    { name: "description", content: "Welcome to Arc Ward!" },
  ];
}

export default function Home() {
  return (
    <div>
      Hello World!
    </div>
  );
}
