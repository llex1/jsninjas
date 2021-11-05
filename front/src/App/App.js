import "./App.css";

import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Skeleton from "@mui/material/Skeleton";

function App() {
  const [isPhotoLoad, handleIsPhotoLoad] = useState("");
  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      mode: "cors",
      // headers: {

      // }
    };
    fetch("http://127.0.0.1:8080", fetchOptions)
      .then((data) => {
        return data.blob();
      })
      .then(data => {
        const SXX = URL.createObjectURL(data);
        handleIsPhotoLoad(SXX)

      });

    console.log("effect");
  }, []);

  return (
    <Container>
      <Card sx={{ maxWidth: 400 }}>
        {isPhotoLoad ? (
          <CardMedia
            component="img"
            height="240"
            src={isPhotoLoad}
          />
        ) : (
          <Skeleton variant="rectangular" height={240} />
        )}

        <CardContent>
          <Typography>Supermane</Typography>
          <Typography>
            He was born Kal-El on the planet Krypton, before being rocketed to
            Earth as an infant by his scientist father Jor-El, moments before
            Krypton's destruction...
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
