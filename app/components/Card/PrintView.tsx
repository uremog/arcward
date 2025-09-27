import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardDisplay from "./CardDisplay.jsx";
import type { CardObject } from "../../types";

type PrintViewProps = {
  cardObjects: CardObject[];
};

export default function PrintView({ cardObjects }: PrintViewProps) {
  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // group into rows of 3 cards
  const rows: CardObject[][] = chunkArray(cardObjects, 3);

  return (
    <div className="print-view">
      <Container fluid>
        {rows.map((row, rowIndex) => (
          <Row key={`row-${rowIndex}`} className="mb-4">
            {row.map((cardObject, colIndex) => (
              <Col
                key={`col-${rowIndex}-${colIndex}`}
                xs={4}
                className="d-flex justify-content-center"
              >
                <div className="print-card card-preview">
                  <CardDisplay cardObject={cardObject} />
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
