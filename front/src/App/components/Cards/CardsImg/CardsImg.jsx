import { Fragment, useEffect, useState } from "react";

function CardsImg({heroId}) {
  const [image, handleImage] = useState("")
  
  
  
  useEffect(()=>{
    console.log(image);
  },[image])

  async function getImage(){
    const result = await fetch(`http://127.0.0.1:8080/image/${heroId}`)
    const newBlob = await result.blob()
    // const newBlob = new Blob(newJson.data, {type : 'image/png'})
    console.log(newBlob);
    const newURL = URL.createObjectURL(newBlob)
    console.log(newURL);
    handleImage(newURL)
    // console.log(newBlob);
    console.log(image);
  }

  useEffect(()=>{
    getImage()
  },[])
  return ( 
    <Fragment>
      <img src={image} alt="hero"/> 
    </Fragment>
  );
}

export default CardsImg;