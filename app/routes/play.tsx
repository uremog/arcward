import type { Route } from "./+types/play";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward Play" },
    { name: "description", content: "Arc Ward Play" },
  ];
}

export default function Play() {
  return (
    <div>
      Play
    </div>
  );
}

