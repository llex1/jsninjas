import { Fragment, useEffect, useState } from "react";

import styles from './CardsImg.module.css';
import placeholderAvatar from './../../../assets/placeholder.svg'



function CardsImg({ heroId, isImagesExist }) {
  const [image, handleImage] = useState("")

  async function getImage() {

    if (isImagesExist) {
      const result = await fetch(`http://127.0.0.1:8080/image/${heroId}`)
      const newBlob = await result.blob()
      const newURL = URL.createObjectURL(newBlob)
      handleImage(newURL)
    } else {
      handleImage(placeholderAvatar)
    }

  }
  useEffect(() => {
    getImage()
  }, [])
  return (
    <Fragment>
      <img src={image} alt="hero" className={styles.img}/>
    </Fragment>
  );
}

export default CardsImg;