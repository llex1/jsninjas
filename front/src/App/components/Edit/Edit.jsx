import { useState, useEffect } from "react";

import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import styles from './Edit.module.css';
// import placeholderAvatar from './../../../assets/placeholder.svg'

function Edit(props) {
  const heroId = props.heroId

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
  const [isInfoChanging, hanndleInfoChanging] = useState('disabled')
  const [isImagesExist, handleIsImagesExist] = useState(false)

  useEffect(() => {
    if (heroId) {
      getInfo()
    }
  }, [heroId])
  async function getInfo() {
    const result = await (await fetch(`http://127.0.0.1:8080/info/${heroId}`)).json()
    allImages(result.isImagesExist)
    nicknameHandle(result.nickname)
    realnameHandle(result.realname)
    descriptionHandle(result.description)
    superpowersHandle(result.superpowers)
    phraseHandle(result.phrase)
    handleIsImagesExist(result.isImagesExist)
  }
  async function allImages(_isImageExist){
    


  }


  async function handleDelete(e) {
    e.preventDefault();
    const result = await fetch(`http://127.0.0.1:8080/delete/${heroId}?isImagesExist=${isImagesExist}`, {
      method: "DELETE"
    })
    if (result.status === "500") { console.log('something wrong') }
    props.onHide()
  }

  function handleChange(e) {
    isInfoChanging && hanndleInfoChanging('')
    listOfUseState[`${e.target.id}Handle`](e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    const outData = new FormData();
    outData.append("heroId", heroId)
    outData.append("isImagesExist", isImagesExist)
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
    const data = await fetch("http://127.0.0.1:8080/update", {
      method: "PUT",
      body: outData,
    });

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
          Edit Superhero
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row className={styles.imagesGrid}>
            {/* images */}
          </Row>
          <Form onSubmit={handleSubmit} onChange={handleChange} id="addSuperhero">
            <Row className="mb-3">
              {/* Lodash */}
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
              <Button variant="success" disabled={isInfoChanging} type="submit" className="col-5 mx-auto">
                Save
              </Button>
              <Button variant="danger" type="button" className="col-5 mx-auto" onClick={handleDelete}>
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