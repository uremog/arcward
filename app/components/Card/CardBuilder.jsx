import React, { useId } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";

/**
 * CardBuilder
 * Props:
 *   cardObject: { arcs: boolean[], wards: boolean[], character: boolean[] }
 *   onChange: (updatedCardObject) => void
 */
const CardBuilder = ({ cardObject, onChange }) => {
  const formId = useId(); // unique per component instance

  if (!cardObject) return null;

  const handleToggle = (group, index) => {
    const updated = { ...cardObject };
    updated[group] = [...updated[group]];
    updated[group][index] = !updated[group][index];
    onChange(updated);
  };

  const renderGroup = (groupName, items) => (
    <Form.Group
      className="mb-3"
      controlId={`${groupName}-form-${formId}`}
    >
      {items.map((checked, i) => (
        <Form.Check
          className="text-capitalize"
          key={`${groupName}-${formId}-${i}`}
          type="checkbox"
          id={`${groupName}-${formId}-${i}`}
          checked={checked}
          onChange={() => handleToggle(groupName, i)}
          label={
            <span
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {`${groupName} ${i + 1}`}
            </span>
          }
        />
      ))}
    </Form.Group>
  );

  return (
    <Form>
      <Container>
        <Row>
          <Col>
            {renderGroup("arcs", cardObject.arcs)}
          </Col>
          <Col>
            {renderGroup("wards", cardObject.wards)}
          </Col>
        </Row>
      </Container>
      {/* {renderGroup("character", cardObject.character)} */}
    </Form>
  );
};

export default CardBuilder;
