import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button"

function App() {

  function handleForm(e){
    e.preventDefault()
    console.log(e);
    console.log(e.target.nickname.value);
    console.log(e.target.files);
  }

  return (
    <Fragment>
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Form onSubmit={handleForm}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-12 col-md-6" controlId="nickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="col-12 col-md-6" controlId="realname">
              <Form.Label>Real Name</Form.Label>
              <Form.Control type="text"></Form.Control>
            </Form.Group>
          </Row>

            <Form.Control type='file' className="mb-3" multiple id="files"/>


          <Button variant="primary" type="submit">Add Superhore</Button>
        </Form>
      </Container>
    </Fragment>
  );
}

export default App;
