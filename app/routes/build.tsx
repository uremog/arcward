import React, { useState } from "react";
import type { Route } from "./+types/build";
import CardDisplay from "../components/Card/CardDisplay.jsx";
import CardBuilder from "../components/Card/CardBuilder.jsx";
import { Container, Row, Col, Button, Card, CardBody, CardHeader, Accordion } from "react-bootstrap";
import _ from "lodash";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward Build" },
    { name: "description", content: "Arc Ward Build" },
  ];
}

export default function Build() {
  const defaultCard = {
    arcs: [true, true, true, true, true, true, true, true],
    wards: [true, true, true, true, true, true, true, true],
    character: [true],
  };

  // Start with 1 card
  const [cardObjects, setCardObjects] = useState([
    _.cloneDeep(defaultCard),
  ]);

  const handleUpdate = (index, updatedCard) => {
    const newCards = [...cardObjects];
    newCards[index] = updatedCard;
    setCardObjects(newCards);
  };

  const addCard = () => {
    setCardObjects([...cardObjects, _.cloneDeep(defaultCard)]);
  };

  const removeCard = (index) => {
    const newCards = cardObjects.filter((card, i) => i !== index);
    setCardObjects(newCards);
  };

  return (
    <div>
      <Container>
        {cardObjects.map((cardObject, i) => (
          <Row key={`card-${i}`} className="mb-2 align-items-center">
            <Col>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <span>
                      Card {i}
                    </span>
                    <span>
                      
                    </span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <CardBuilder
                        cardObject={cardObject}
                        onChange={(updated) => handleUpdate(i, updated)}
                      />
                    </div>
                    <div className="text-right">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeCard(i)}
                        disabled={cardObjects.length <= 1}
                      >
                        Remove
                      </Button>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              
            </Col>
            <Col>
              <div style={{ width: "450px" }}>
                <CardDisplay cardObject={cardObject} />
              </div>
            </Col>
          </Row>
        ))}

        <Row>
          <Col>
            <Button onClick={addCard}>Add Card</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
