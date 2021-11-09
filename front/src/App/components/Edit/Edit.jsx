import { useState } from "react";

import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function Edit(props) {

  const [nicknameValue, nicknameHandle] = useState("");
  const [realnameValue, realnameHandle] = useState("");
  const [descriptionValue, descriptionHandle] = useState("");
  const [superpowersValue, superpowersHandle] = useState("");
  const [phraseValue, phraseHandle] = useState("");
  const [imagesValue, imagesHandle] = useState("");
  const listOfUseState = {
    nicknameHandle,
    realnameHandle,
    descriptionHandle,
    superpowersHandle,
    phraseHandle,
    imagesHandle,
  };
  function handleChange(e) {
    e.preventDefault();
  }
  function handleSubmit(e) {
    e.preventDefault();
  }




  return (

    <Modal
      {...props}
      // dialogClassName="modal-90w"
      size="lg"
      aria-labelledby="edit-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="edit-modal">
          Add Superhero
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>







          <Form onSubmit={handleSubmit} onChange={handleChange} id="addSuperhero">
            <Row className="mb-3">
              {/* Вважаємо що нікнейм унікальний, буде час прикручу Lodash*/}
              <Form.Group as={Col} className="col-12 col-md-6" controlId="nickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control type="text" value={nicknameValue} required />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-6" controlId="realname">
                <Form.Label>Real Name</Form.Label>
                <Form.Control type="text" value={realnameValue} />
              </Form.Group>
            </Row>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Origin Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                value={descriptionValue}
              />
            </Form.Group>
            <Form.Group controlId="superpowers" className="mb-3">
              <Form.Label>Superpowers</Form.Label>
              <Form.Control as="textarea" rows={2} value={superpowersValue} />
            </Form.Group>
            <Form.Group controlId="phrase" className="mb-3">
              <Form.Label>Catch Phrase</Form.Label>
              <Form.Control type="text" value={phraseValue} />
            </Form.Group>

            <Form.Control
              type="file"
              className="mb-3"
              multiple
              id="images"
              accept="image/*"
              value={imagesValue}
            />
            <Row className="row g-2" >
              <Button variant="success" type="submit" className="col-5 mx-auto">
                Save
              </Button>
              <Button variant="danger" type="button" className="col-5 mx-auto">
                Delete
              </Button>
            </Row>
          </Form>










        </Container>
      </Modal.Body>

    </Modal>
  )

}
export default Edit