import Container from "react-bootstrap/Container";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
// import Spinner from "react-bootstrap/Spinner";

import CardsTitle from "./CardsTitle/CardTitle";
import CardsImg from "./CardsImg/CardsImg";

import styles from './Cards.module.css';

function Cards({ data }) {
  return (
    <Container>
      <ul className={styles.grid}>
        {data.map((el)=>{return (
          <li key={el.heroId}>
            <CardsImg heroId={el.heroId} isImagesExist={el.isImagesExist}/>
            <CardsTitle nickname={el.nickname}/>
          </li>
        )})}
      </ul>
    </Container>
  )
}

export default Cards;
