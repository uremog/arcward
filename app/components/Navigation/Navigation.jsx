import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => (

	<Navbar bg="dark" variant="dark" sticky="top" expand="lg" id="navigation">
		<Container>
			<Navbar.Brand>Arc Ward</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav"/>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<LinkContainer to="/build">
						<Nav.Link>Build</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/play">
						<Nav.Link>Play</Nav.Link>
					</LinkContainer>
				</Nav>
				<Nav className="d-flex">
					<LinkContainer to="/">
						<Nav.Link>FAQ</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/">
						<Nav.Link>Contact</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
);

export default Navigation;
