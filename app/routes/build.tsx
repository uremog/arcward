import type { Route } from "./+types/build";
import Card from '../components/Card/Card.jsx';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward Build" },
    { name: "description", content: "Arc Ward Build" },
  ];
}

const cardStyle = {
  width: "450px"
};

const cardObject = {
  arcs:[true, true, true, true, true, true, true],
  wards:[true, true, true, true, true, true, true],
  character:[true]
};

export default function Build() {
  return (
    <div>
      <div>
        Build
      </div>
      <div style={cardStyle}>
        <Card cardObject={cardObject} />
      </div>
    </div>
  );
}

