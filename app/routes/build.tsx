import React, { useState } from 'react';
import type { Route } from "./+types/build";
import CardDisplay from '../components/Card/CardDisplay.jsx';
import CardBuilder from '../components/Card/CardBuilder.jsx';
import { Container, Row, Col } from "react-bootstrap";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward Build" },
    { name: "description", content: "Arc Ward Build" },
  ];
}

export default function Build() {
  const [cardObject, setCardObject] = useState({
    arcs:[true, true, true, true, true, true, true, true],
    wards:[true, true, true, true, true, true, true, true],
    character:[true]
  });

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <CardBuilder cardObject={cardObject} onChange={(updated) => setCardObject(updated)} />
          </Col>
          <Col>
            <div style={{width: "450px"}}>
              <CardDisplay cardObject={cardObject} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

