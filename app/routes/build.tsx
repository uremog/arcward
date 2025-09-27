// Build.tsx
import React, { useState } from "react";
import type { Route } from "./+types/build";
import CardDisplay from "../components/Card/CardDisplay.jsx";
import CardBuilder from "../components/Card/CardBuilder.jsx";
import PrintView from "../components/Card/PrintView.jsx";
import { Container, Row, Col, Button, Collapse } from "react-bootstrap";
import type { CardObject } from "../types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Arc Ward Build" },
    { name: "description", content: "Arc Ward Build" },
  ];
}

const cloneCard = (card: CardObject): CardObject =>
  JSON.parse(JSON.stringify(card));

export default function Build() {
  const defaultCard: CardObject = {
    arcs: [true, true, true, true, true, true, true, true],
    wards: [true, true, true, true, true, true, true, true],
    character: [true],
  };

  const [cardObjects, setCardObjects] = useState<CardObject[]>([
    cloneCard(defaultCard),
  ]);
  const [printMode, setPrintMode] = useState(false);
  const [expanded, setExpanded] = useState<boolean[]>([true]);

  const handleUpdate = (index: number, updatedCard: CardObject) => {
    const newCards = [...cardObjects];
    newCards[index] = updatedCard;
    setCardObjects(newCards);
  };

  const addCard = () => {
    setCardObjects([...cardObjects, cloneCard(defaultCard)]);
    setExpanded([...expanded, true]);
  };

  const removeCard = (index: number) => {
    setCardObjects(cardObjects.filter((_, i) => i !== index));
    setExpanded(expanded.filter((_, i) => i !== index));
  };

  const toggleExpand = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div id="build">
      <Container>
        {!printMode ? (
          <>
            {cardObjects.map((cardObject, i) => (
              <Row key={`card-${i}`} className="mb-3 align-items-start">
                <Col>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">Card {i + 1}</h5>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => toggleExpand(i)}
                    >
                      {expanded[i] ? "Hide" : "Show"}
                    </Button>
                  </div>

                  <Collapse in={expanded[i]}>
                    <div>
                      <CardBuilder
                        cardObject={cardObject}
                        onChange={(updated) => handleUpdate(i, updated)}
                      />
                      <div className="text-right mt-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeCard(i)}
                          disabled={cardObjects.length <= 1}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Collapse>
                </Col>
                <Col className="d-flex justify-content-center">
                  <div className="card-preview">
                    <CardDisplay cardObject={cardObject} />
                  </div>
                </Col>
              </Row>
            ))}

            <Row>
              <Col>
                <Button onClick={addCard}>Add Card</Button>
                <Button
                  className="ms-2"
                  variant="secondary"
                  onClick={() => setPrintMode(true)}
                >
                  Switch to Print View
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <PrintView cardObjects={cardObjects} />
            <Row className="mt-3">
              <Col>
                <Button variant="primary" onClick={() => window.print()}>
                  Print
                </Button>
                <Button
                  className="ms-2"
                  variant="secondary"
                  onClick={() => setPrintMode(false)}
                >
                  Back to Edit View
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
