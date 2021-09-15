import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Row, Col } from 'react-bootstrap';

const Header = () => {
    return <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">
                <Row className="logo-container">
                    <Col><div className="logo">T</div></Col>
                    <Col><div className="logo-name">TakeHome</div></Col>
                </Row>
            </Navbar.Brand>
        </Container>
    </Navbar> 
}

export default Header;