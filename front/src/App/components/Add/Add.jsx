import { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

function Add() {
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
    listOfUseState[`${e.target.id}Handle`](e.target.value);
  }
  function handleClear() {
    Object.values(listOfUseState).forEach((el) => {
      el("");
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target[0].type);
    const outData = new FormData();
    console.log(e.target);
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].type === "text" || e.target[i].type === "textarea") {
        outData.append(e.target[i].id, e.target[i].value);
      }
      if (e.target[i].type === "file") {
        for (let n = 0; n < e.target[i].files.length; n++) {
          outData.append("images", e.target[i].files[n]);
        }
      }
    }
    const data = await fetch("http://127.0.0.1:8080/add", {
      method: "POST",
      body: outData,
    });
    console.log(data);
    handleClear();
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} onChange={handleChange} id="addSuperhero">
        <Row className="mb-3">
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

        <Button variant="primary" type="submit">
          Add Superhore
        </Button>
      </Form>
    </Container>
  );
}

export default Add;
