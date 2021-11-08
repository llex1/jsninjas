import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Fragment, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner'



//components
import Add from "./components/Add";
import Cards from './components/Cards'

function App() {
  const [rootData, handleRootData] = useState([])
  
  
  useEffect(()=>{
    getData()
  },[])

  async function getData(){
    const data = await (await fetch("http://127.0.0.1:8080?page=")).json();
    handleRootData(data)
    // console.log(data);
  }



  return (
    <Fragment>
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">Superhero</Navbar.Brand>
        </Container>
      </Navbar>
      {/* <Add/> */}
      {rootData.length ? <Cards data={rootData}/> : <Fragment/>}


      
    </Fragment>
  );
}

export default App;
