import type { Route } from "./+types/build";
import Card from '../components/Card/Card.jsx';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward Build" },
    { name: "description", content: "Arc Ward Build" },
  ];
}

const cardStyle = {
  width: "400px"
};

export default function Build() {
  return (
    <div>
      <div>
        Build
      </div>
      <div style={cardStyle}>
        <Card />
      </div>
    </div>
  );
}

