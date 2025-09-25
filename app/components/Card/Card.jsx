import PropTypes from "prop-types";
import { Container, Row, Col } from 'react-bootstrap';
import ArcMarker from './ArcMarker.jsx';
import WardMarker from './WardMarker.jsx';
import CharacterMarker from "./CharacterMarker.jsx";

/*
    Card Object:
    {
        arcs: [0-7] (arranged clockwise, starting at the top-left)
        wards: [0-7] (arranged clockwise, starting at the top-left)
    }
*/
const Card = ({cardObject}) => (
    <Container fluid>
        <Row>
            <Col>
                <WardMarker variant="corner" rotate={180} visible={cardObject.wards[0]} />
            </Col>
            <Col className="text-center">
                <WardMarker rotate={0} visible={cardObject.wards[1]} />
            </Col>
            <Col className="text-end">
                <WardMarker variant="corner" rotate={-90} visible={cardObject.wards[2]} />
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={225} visible={cardObject.arcs[0]} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
            <Col className="text-center">
                <ArcMarker rotate={-90} visible={cardObject.arcs[1]} />
            </Col>
            <Col className="text-end">
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={-45} visible={cardObject.arcs[2]} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <Col>
                        <WardMarker rotate={90} visible={cardObject.wards[3]} />
                    </Col>
                    <Col>
                        <ArcMarker rotate={180} visible={cardObject.arcs[3]} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
            <Col className="text-center">
                <CharacterMarker visible={cardObject.character[0]} />
            </Col>
            <Col className="text-end">
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={0} visible={cardObject.arcs[4]} />
                    </Col>
                    <Col>
                        <WardMarker rotate={90} visible={cardObject.wards[4]} />
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col>
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={135} visible={cardObject.arcs[5]} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
            <Col className="text-center">
                <ArcMarker rotate={90} visible={cardObject.arcs[6]} />
            </Col>
            <Col className="text-end">
                <Row>
                    <Col></Col>
                    <Col>
                        <ArcMarker rotate={45} visible={cardObject.arcs[7]} />
                    </Col>
                    <Col></Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col>
                <WardMarker variant="corner" rotate={90} visible={cardObject.wards[5]} />
            </Col>
            <Col className="text-center">
                <WardMarker rotate={0} visible={cardObject.wards[6]} />
            </Col>
            <Col className="text-end">
                <WardMarker variant="corner" rotate={0} visible={cardObject.wards[7]} />
            </Col>
        </Row>
    </Container>
);

Card.propTypes = {
    "cardObject": PropTypes.object
}

export default Card;
