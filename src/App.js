import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col xs={2} md={2} lg={2}>
            <div>
              Left
            </div>
          </Col>
          <Col xs={8} md={8} lg={8}>
            <div></div>
          </Col>
          <Col xs={2} md={2} lg={2}>
            <div>
              Chat room
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
