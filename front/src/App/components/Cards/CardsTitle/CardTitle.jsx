import styles from './CardsTitle.module.css';

function CardsTitle({ nickname }) {
  return <p className={`text-center ${styles.title}`}>{nickname}</p>;
}

export default CardsTitle;
