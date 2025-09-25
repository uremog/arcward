import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';
import ArcMarker from './ArcMarker.jsx';
import WardMarker from './WardMarker.jsx';
import CharacterMarker from "./CharacterMarker.jsx";

/*
    Card Object:
    {
        arcs: [0-7] (arranged clockwise, starting at the top)
        wards: [0-7] (arranged clockwise, starting at the top)
    }
*/
const Card = (cardObject) => (
    <Container fluid>
        <Row>
            <Col>
                <WardMarker variant="corner" rotate={180} />
            </Col>
            <Col className="text-center">
                <WardMarker rotate={0} />
            </Col>
            <Col className="text-end">
                <WardMarker variant="corner" rotate={-90} />
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={225} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
            <Col className="text-center">
                <ArcMarker rotate={-90} />
            </Col>
            <Col className="text-end">
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={-45} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <Col>
                        <WardMarker rotate={90} />
                    </Col>
                    <Col>
                        <ArcMarker rotate={180} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
            <Col className="text-center">
                <CharacterMarker />
            </Col>
            <Col className="text-end">
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={0} />
                    </Col>
                    <Col>
                        <WardMarker rotate={90} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={135} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
            <Col className="text-center">
                <ArcMarker rotate={90} />
            </Col>
            <Col className="text-end">
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={45} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col>
                <WardMarker variant="corner" rotate={90} />
            </Col>
            <Col className="text-center">
                <WardMarker rotate={0} />
            </Col>
            <Col className="text-end">
                <WardMarker variant="corner" rotate={0} />
            </Col>
        </Row>
    </Container>
);

Card.propTypes = {
    "cardObject": PropTypes.object
}

export default Card;
