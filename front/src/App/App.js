import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Fragment, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';



//components
import Add from "./components/Add";
import Cards from './components/Cards';
import Edit from './components/Edit';

function App() {
  const [rootData, handleRootData] = useState([])
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [heroId, setHeroId] = useState('');


  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    heroId && setModalEdit(true)
  }, [heroId])


  async function getData() {
    const data = await (await fetch("http://127.0.0.1:8080?page=")).json();
    handleRootData(data)
    // console.log(data);
  }
  function editCard(data) {
    setHeroId(data)
  }
  function closeEditCard() {
    setModalEdit(false)
    setHeroId('')
  }

  return (
    <Fragment>
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand href="/">Superhero</Navbar.Brand>
          <Button type="button" value="add" onClick={() => setModalAdd(true)} >Add One</Button>
        </Container>
      </Navbar>
      <Add
        show={modalAdd}
        onHide={() => setModalAdd(false)}
      />
      <Edit
        heroId={heroId}
        show={modalEdit}
        onHide={closeEditCard}
      />
      {rootData.length ? <Cards data={rootData} edit={editCard} /> : <Fragment />}

{/* не встигаю, дуже шкода  */}

      <Container className="py-4">
        <Pagination className="justify-content-center">
          <Pagination.Prev disabled />
          <Pagination.Item disabled>{1}</Pagination.Item>
          <Pagination.Item disabled>{3}</Pagination.Item>
          <Pagination.Item disabled>{3}</Pagination.Item>
          <Pagination.Item disabled>{4}</Pagination.Item>
          <Pagination.Next disabled/>
        </Pagination>
      </Container>


    </Fragment>
  );
}

export default App;
